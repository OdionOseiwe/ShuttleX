import User from "../models/User.model.js";
import { Driver } from "../Models/driver.model.js";
import Notification from '../Models/notifications.model.js';
import { verifyNIN } from "../utils/MockNINDataAndVerifiyNIN.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import bcryptjs from "bcryptjs";

// ✅ Signup
export const signUp = async (req, res) => {
  const { name, email, password, role, nin, vehicleType, vehicleNumber, capacity, mobileNumber } = req.body;

  try {
    if (!email || !password || !name || !role || !mobileNumber) {
      return res.status(400).json({ success: false, msg: "Please fill all required fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, msg: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, mobileNumber, role });
    await user.save();

    // Optional: welcome notification
    await Notification.create({
      userId: user._id,
      title: "Welcome to RideApp!",
      data: { message: "Thank you for signing up!" },
    });

    let globalDriver;
    if (role === "driver") {
      const ninResult = verifyNIN(nin.toString(), name);
      if (!ninResult) {
        return res.status(404).json({ success: false, msg: "Invalid NIN" });
      }

      const driver = new Driver({
        userId: user._id,
        nin,
        vehicleType,
        vehicleNumber,
        capacity,
        status: "pending",
      });
      globalDriver = driver;
      await driver.save();

      // Notify admin (optional) about new pending driver
      // Assuming admins are fetched from DB
      const admins = await User.find({ role: "admin" });
      for (const admin of admins) {
        await Notification.create({
          userId: admin._id,
          title: "New Driver Signup",
          data: { driverId: driver._id, driverName: user.name },
        });
      }
    }

    generateTokenAndSetCookie(res, user._id);

    return res.status(201).json({
      success: true,
      msg: "User created successfully",
      user: { ...user._doc, password: undefined },
      driver: globalDriver,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ success: false, msg: "Error occurred while signing up" });
  }
};

// ✅ Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) return res.status(400).json({ success: false, msg: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, msg: "Invalid email" });

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ success: false, msg: "Invalid password" });

    generateTokenAndSetCookie(res, user._id);

    return res.status(200).json({
      success: true,
      msg: "User logged in successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, msg: "Error occurred while logging in" });
  }
};

// ✅ Approve Driver (Admin only)
export const approveDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);
    if (!user || user.role !== "admin") return res.status(403).json({ success: false, msg: "Only admin can approve drivers" });

    const driver = await Driver.findOne({ userId: id });
    if (!driver) return res.status(404).json({ success: false, msg: "Driver not found" });

    driver.status = "approved";
    await driver.save();

    // Notify driver
    await Notification.create({
      userId: driver.userId,
      title: "Driver Approved",
      data: { message: "Your driver account has been approved!" },
    });

    return res.status(200).json({ success: true, msg: "Driver approved successfully" });
  } catch (error) {
    console.error("Approve Driver Error:", error);
    return res.status(500).json({ success: false, msg: "Error occurred while approving driver" });
  }
};

// ✅ Reject Driver (Admin only)
export const rejectDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);
    if (!user || user.role !== "admin") return res.status(403).json({ success: false, msg: "Only admin can reject drivers" });

    const driver = await Driver.findOne({ userId: id });
    if (!driver) return res.status(404).json({ success: false, msg: "Driver not found" });

    driver.status = "rejected";
    await driver.save();

    // Notify driver
    await Notification.create({
      userId: driver.userId,
      title: "Driver Rejected",
      data: { message: "Your driver account has been rejected." },
    });

    return res.status(200).json({ success: true, msg: "Driver rejected successfully" });
  } catch (error) {
    console.error("Reject Driver Error:", error);
    return res.status(500).json({ success: false, msg: "Error occurred while rejecting driver" });
  }
};

// ✅ Get Pending Drivers (Admin)
export const getPendingDrivers = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== "admin") return res.status(403).json({ success: false, msg: "Only admin can view pending drivers" });

    const pendingDrivers = await Driver.find({ status: "pending" });
    if (!pendingDrivers.length) return res.status(404).json({ success: false, msg: "No pending drivers found" });

    return res.status(200).json({ success: true, drivers: pendingDrivers });
  } catch (error) {
    console.error("Fetch Pending Drivers Error:", error);
    return res.status(500).json({ success: false, msg: "Error occurred while fetching pending drivers" });
  }
};

// ✅ Update Driver/User Profile
export const updateDriversProfile = async (req, res) => {
  try {
    const { vehicleType, vehicleNumber, capacity, mobileNumber } = req.body;
    const driver = await Driver.findOne({ userId: req.userId });
    const user = await User.findById(req.userId);

    if (vehicleType) driver.vehicleType = vehicleType;
    if (vehicleNumber) driver.vehicleNumber = vehicleNumber;
    if (capacity) driver.capacity = capacity;
    if (mobileNumber) user.mobileNumber = mobileNumber;

    await driver.save();
    await user.save();

    return res.status(200).json({
      success: true,
      msg: {
        driver,
        user: { ...user._doc, password: undefined },
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ success: false, msg: "Error occurred while updating profile" });
  }
};

// ✅ Update Driver Status
export const updateDriverStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const driver = await Driver.findOne({ userId: req.userId });
    if (!driver) return res.status(404).json({ success: false, msg: "Driver not found" });

    driver.status = status;
    await driver.save();

    return res.status(200).json({ success: true, msg: `Driver now ${status}` });
  } catch (error) {
    console.error("Driver Status Error:", error);
    return res.status(500).json({ success: false, msg: "Error occurred while updating status" });
  }
};

// ✅ Make Admin (Admin only)
export const makeAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== "admin") return res.status(403).json({ success: false, msg: "Only admin can make admins" });

    const { email } = req.body;
    const newAdmin = await User.findOne({ email });
    if (!newAdmin) return res.status(404).json({ success: false, msg: "User not found" });

    newAdmin.role = "admin";
    await newAdmin.save();

    // Notify user
    await Notification.create({
      userId: newAdmin._id,
      title: "Promoted to Admin",
      data: { message: "You have been granted admin privileges." },
    });

    return res.status(200).json({ success: true, msg: `User ${newAdmin._id} is now admin` });
  } catch (error) {
    console.error("Make Admin Error:", error);
    return res.status(500).json({ success: false, msg: "Error occurred while making admin" });
  }
};

// ✅ Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("auth_token", { httpOnly: true, secure: true, sameSite: "strict" });
    return res.status(200).json({ success: true, msg: "User logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ success: false, msg: "Error occurred while logging out" });
  }
};

// ✅ Check Auth
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, msg: "User not found" });

    return res.status(200).json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    console.error("Check Auth Error:", error);
    return res.status(500).json({ success: false, msg: "Error occurred while checking auth" });
  }
};

//✅  get notifications for a user 
export const getUserNotifications = async(req,res)=>{
  try{
    const notifications = await Notification.find({userId: req.userId})
    if(!notifications.length){
      return res.status(404).json({success:false, msg:"No notifications found"})
    }
    return res.status(200).json({success:true, notifications})
  }catch(error){
    console.log("Get Notifications error:", error)
    return res.status(500).json({success:false, msg:"Error occurred while fetching notifications"})
  }
}

// 
