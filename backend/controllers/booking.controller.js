import { Booking } from "../Models/booking.model.js";
import { User } from "../Models/user.model.js";
import { Driver } from "../Models/driver.model.js";

// ✅ Student books a ride
export const bookRide = async (req, res) => {
  try {
    const { startLat, startLng, destLat, destLng } = req.body;

    // Create a booking record
    const booking = new Booking({
      studentId: req.userId,
      status: "pending",
      start: {
        lat: startLat,
        lng: startLng,
      },
      destination: {
        lat: destLat,
        lng: destLng,
      },
    });

    await booking.save();

    const user = await User.findById(req.userId).select("-password");

    return res.status(201).json({
      success: true,
      msg: {
        booking,
        user,
      },
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ success: false, msg: "Error creating booking" });
  }
};

// ✅ Driver accepts ride
export const acceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.userId;

    if (!bookingId) {
      return res.status(400).json({ success: false, msg: "bookingId is required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, msg: "Booking not found" });
    }

    const user = await User.findById(userId);
    const driver = await Driver.findOne({userId:userId});

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    if (!driver) {
      return res.status(404).json({ success: false, msg: "Driver not found" });
    }

    if(driver.status === "rejected" || driver.status === "unavailable" || driver.status ==="pending"){
      return res.status(400).json({
        success: false,
        msg: "Driver unavailable or unverified",
      });
    }

    if (booking.status !== "pending" && booking.status !== "rejected") {
      return res.status(400).json({
        success: false,
        msg: "Ride already accepted or completed",
      });
    }

    booking.driverId = driver._id;
    booking.status = "confirmed";
    await booking.save();

    driver.status = "on-trip";
    await driver.save();

    return res.status(200).json({
      success: true,
      msg: {
        name: user.name, 
        mobileNumber: user.mobileNumber,
        booking,
        driver,
      },
    });
  } catch (error) {
    console.error("Error accepting ride:", error);
    return res.status(500).json({ success: false, msg: "Error accepting booking" });
  }
};

// ✅ Reject booking
export const rejectBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, msg: "Booking not found" });
    }

    booking.status = "rejected";
    await booking.save();

    return res.status(200).json({ success: true, msg: "Booking rejected" });
  } catch (error) {
    console.error("Error rejecting booking:", error);
    return res.status(500).json({ success: false, msg: "Error rejecting booking" });
  }
};

// ✅ Cancel ride (User cancels)
export const cancelRide = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, msg: "Booking not found" });
    }

    if (booking.studentId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        msg: "Not authorized to cancel this ride",
      });
    }

    if (booking.status === "completed") {
      return res.status(400).json({ success: false, msg: "Cannot cancel a completed ride" });
    }

    booking.status = "cancelled";
    await booking.save();

    return res.status(200).json({ success: true, msg: "Ride cancelled", booking });
  } catch (error) {
    console.error("Error cancelling ride:", error);
    return res.status(500).json({ success: false, msg: "Error cancelling ride" });
  }
};

// ✅ Mark booking as complete (Driver only)
export const completeRide = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    const driver = await Driver.findById(booking.driverId);

    if(!driver){
      return res.status(404).json({ success: false, msg: "Driver not found" });
    }
    if (!booking) {
      return res.status(404).json({ success: false, msg: "Booking not found" });
    }

    if (req.userId !== booking.driverId.toString()) {
      return res.status(403).json({
        success: false,
        msg: "Not authorized: You are not the driver for this ride",
      });
    }

    booking.status = "completed";
    await booking.save();

    driver.status = "available";
    await driver.save();

    return res.status(200).json({
      success: true,
      msg: "Ride completed successfully",
      booking,
    });
  } catch (error) {
    console.error("Error completing ride:", error);
    return res.status(500).json({ success: false, msg: "Error completing ride" });
  }
};

// ✅ Get confirmed driver details for a ride
export const getConfirmedDriverDetails = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ success: false, msg: "bookingId is required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, msg: "Booking not found" });
    }

    const driver = await Driver.findById(booking.driverId);
    const user = await User.findById(booking.driverId);

    if (!user || !driver) {
      return res.status(404).json({ success: false, msg: "Driver not found" });
    }

    return res.status(200).json({
      success: true,
      msg: {
        name: user.name,
        mobileNumber: user.mobileNumber,
        booking,
        driver,
      },
    });
  } catch (error) {
    console.error("Error fetching driver details:", error);
    return res.status(500).json({ success: false, msg: "Error fetching driver details" });
  }
};

// ✅ Get all pending bookings
export const getPendingBookings = async (req, res) => {
  try {
    const pendingBookings = await Booking.find({ status: "pending" });

    if (pendingBookings.length === 0) {
      return res.status(404).json({ success: false, msg: "No pending bookings found" });
    }

    return res.status(200).json({ success: true, bookings: pendingBookings });
  } catch (error) {
    console.error("Error getting pending bookings:", error);
    return res.status(500).json({ success: false, msg: "Error fetching pending bookings" });
  }
};
