import { Booking } from "../Models/booking.model.js";
import User from "../Models/User.model.js";
import { Driver } from "../Models/driver.model.js";
import Notification from '../Models/notifications.model.js';

// ✅ Book a ride (Student)
export const bookRide = async (req, res) => {
  try {
    const { startLat, startLng, destLat, destLng } = req.body;

    const booking = new Booking({
      studentId: req.userId,
      start: { lat: startLat, lng: startLng },
      destination: { lat: destLat, lng: destLng },
      status: "pending",
    });
    await booking.save();

    const user = await User.findById(req.userId).select("-password");

      await Notification.create({
        userId: req.userId,
        title: "new Ride booked",
        data: { bookingId: booking._id, startLat, startLng, destLat, destLng },
      });

    return res.status(201).json({ success: true, msg: { booking, user } });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ success: false, msg: "Error creating booking" });
  }
};

// ✅ Accept booking (Driver)
export const acceptBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ success: false, msg: "Booking not found" });

    const driver = await Driver.findOne({ userId });
    if (!driver) return res.status(404).json({ success: false, msg: "Driver not found" });
    if (driver.status === "rejected" || driver.status === "unavailable" || driver.status === "pending") {
      return res.status(400).json({ success: false, msg: "Driver unavailable or unverified" });
    }

    if (booking.status !== "pending" && booking.status !== "rejected") {
      return res.status(400).json({ success: false, msg: "Ride already accepted or completed" });
    }

    booking.driverId = driver._id;
    booking.status = "confirmed";
    driver.status = "on-trip";

    await booking.save();
    await driver.save();

    const student = await User.findById(booking.studentId);

    // Notify student
    await Notification.create({
      userId: booking.studentId,
      title: "Ride Confirmed",
      data: { driverId: driver._id, driverName: student.name, bookingId: booking._id },
    });

    return res.status(200).json({
      success: true,
      msg: { name: student.name, mobileNumber: student.mobileNumber, booking, driver },
    });
  } catch (error) {
    console.error("Error accepting ride:", error);
    return res.status(500).json({ success: false, msg: "Error accepting booking" });
  }
};

// ✅ Reject booking (Driver)
export const rejectBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ success: false, msg: "Booking not found" });

    booking.status = "rejected";
    await booking.save();

    // Notify student
    await Notification.create({
      userId: booking.studentId,
      title: "Ride Rejected",
      data: { bookingId: booking._id },
    });

    return res.status(200).json({ success: true, msg: "Booking rejected" });
  } catch (error) {
    console.error("Error rejecting booking:", error);
    return res.status(500).json({ success: false, msg: "Error rejecting booking" });
  }
};

// ✅ Cancel ride (Student)
export const cancelRide = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ success: false, msg: "Booking not found" });

    if (booking.studentId.toString() !== req.userId) {
      return res.status(403).json({ success: false, msg: "Not authorized to cancel this ride" });
    }

    if (booking.status === "completed") {
      return res.status(400).json({ success: false, msg: "Cannot cancel a completed ride" });
    }

    booking.status = "cancelled";
    await booking.save();

    // Notify driver if assigned
    if (booking.driverId) {
      await Notification.create({
        userId: booking.driverId,
        title: "Ride Cancelled",
        data: { bookingId: booking._id },
      });
    }

    return res.status(200).json({ success: true, msg: "Ride cancelled", booking });
  } catch (error) {
    console.error("Error cancelling ride:", error);
    return res.status(500).json({ success: false, msg: "Error cancelling ride" });
  }
};

// ✅ Complete ride (Driver)
export const completeRide = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ success: false, msg: "Booking not found" });

    const driver = await Driver.findById(booking.driverId);
    if (!driver) return res.status(404).json({ success: false, msg: "Driver not found" });
    if (req.userId !== driver.userId.toString()) {
      return res.status(403).json({ success: false, msg: "Not authorized: You are not the driver for this ride" });
    }

    booking.status = "completed";
    driver.status = "available";

    await booking.save();
    await driver.save();

    // Notify student
    await Notification.create({
      userId: booking.studentId,
      title: "Ride Completed",
      data: { bookingId: booking._id, driverId: driver._id },
    });

    return res.status(200).json({ success: true, msg: "Ride completed successfully", booking });
  } catch (error) {
    console.error("Error completing ride:", error);
    return res.status(500).json({ success: false, msg: "Error completing ride" });
  }
};

// ✅ Get confirmed driver details
export const getConfirmedDriverDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ success: false, msg: "Booking not found" });

    const driver = await Driver.findById(booking.driverId);
    const user = driver ? await User.findById(driver.userId) : null;
    if (!driver || !user) return res.status(404).json({ success: false, msg: "Driver or user not found" });

    return res.status(200).json({
      success: true,
      msg: { name: user.name, mobileNumber: user.mobileNumber, booking, driver },
    });
  } catch (error) {
    console.error("Error fetching driver details:", error);
    return res.status(500).json({ success: false, msg: "Error fetching driver details" });
  }
};

// ✅ Get pending bookings
export const getPendingBookings = async (req, res) => {
  try {
    const pendingBookings = await Booking.find({ status: "pending" });
    if (!pendingBookings.length) return res.status(404).json({ success: false, msg: "No pending bookings found" });
    return res.status(200).json({ success: true, bookings: pendingBookings });
  } catch (error) {
    console.error("Error getting pending bookings:", error);
    return res.status(500).json({ success: false, msg: "Error fetching pending bookings" });
  }
};

// ✅ Get all bookings
export const getAllBooking = async (req, res) => {
  try {
    const booking = await Booking.find();
    if (!booking.length) return res.status(404).json({ success: false, msg: "No bookings found" });
    return res.status(200).json({ success: true, msg: booking });
  } catch (error) {
    console.error("Error getting all bookings:", error);
    return res.status(500).json({ success: false, msg: "Error fetching bookings" });
  }
};

// ✅ Get all bookings by logged-in user
export const getAllBookingByUser = async (req, res) => {
  try {
    const booking = await Booking.find({ studentId: req.userId });
    if (!booking.length) return res.status(404).json({ success: false, msg: "No bookings found" });
    return res.status(200).json({ success: true, msg: booking });
  } catch (error) {
    console.error("Error getting bookings by user:", error);
    return res.status(500).json({ success: false, msg: "Error fetching bookings" });
  }
};
