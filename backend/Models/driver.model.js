import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  nin: { type: String, required: true, unique: true },
  vehicleType: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["pending","rejected", "approved","available", "unavailable", "on-trip"], 
    default: "pending" 
  }, // pending = waiting for admin approval
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  createdAt: { type: Date, default: Date.now },
});

export const Driver = mongoose.model("Driver", driverSchema);
