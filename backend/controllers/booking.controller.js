import { Booking } from "../Models/booking.model.js";
import  User  from "../Models/user.model.js";
import { Driver } from "../Models/driver.model.js";

// ✅ Student books a ride
export const bookRide = async (req, res) => {
  try {
    const { startLat, startLng, destLat, destLng } = req.body;

    // Create a booking record
    const booking = new Booking({
      studentId: req.userId,
      start: {
        lat: startLat,
        lng: startLng,
      },
      destination: {
        lat: destLat,
        lng: destLng,
      },
      status: "pending",
    });

    const user = await User.findById(req.userId).select("-password");
    await booking.save();

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
    const { id } = req.params;
    const userId = req.userId;

    const booking = await Booking.findById(id);
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

    driver.status = "on-trip";
    await booking.save();
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
    const { id } = req.params;
    const booking = await Booking.findById(id);

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
    const { id } = req.params;

    const booking = await Booking.findById(id);
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
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, msg: "Booking not found" });
    }

    const driver = await Driver.findById(booking.driverId);
        if(!driver){
      return res.status(404).json({ success: false, msg: "Driver not found" });
    }

    if (req.userId !== driver.userId.toString()) {
      return res.status(403).json({
        success: false,
        msg: "Not authorized: You are not the driver for this ride",
      });
    }

    booking.status = "completed";
    driver.status = "available";

    await booking.save();
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
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, msg: "Booking not found" });
    }

    const driver = await Driver.findById(booking.driverId);
    const user = await User.findById(driver.userId);

    if (!driver) {
      return res.status(404).json({ success: false, msg: "Driver not found" });
    }
    if (!user) {
      return res.status(404).json({ success: false, msg: "user not found" });
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

// ✅ Get all booking
export const getAllBooking = async(req, res)=>{
  try {
    const booking = await Booking.find();
    if(!booking){
      return res.status(404).json({ success: false, msg: "No booking found" });
    }
    return res.status(500).json({success:true, msg:booking})
  } catch (error) {
    console.error("Error getting all bookings:", error);
    return res.status(500).json({ success: false, msg: "Error fetching bookings" });
  }
}

// ✅ Get all booking by logged in user
export const getAllBookingByUser = async(req, res)=>{
  try {
    const booking = await booking.find({studentId:req.userId});
    if(!booking){
      return res.status(404).json({ success: false, msg: "No booking found" });
    }
    return res.status(500).json({success:true, msg:booking})
  } catch (error) {
    console.error("Error getting all bookings:", error);
    return res.status(500).json({ success: false, msg: "Error fetching bookings" });
  }
}
