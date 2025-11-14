import mongoose from "mongoose";

const bookingSchema =new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User",  },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", },
  start: { 
    lat: { type: Number },
    lng: { type: Number },
  },
  destination: {
    lat: { type: Number },
    lng: { type: Number },
  },  
  status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});
export const Booking = mongoose.model("Booking", bookingSchema);
