import express from "express";
const router = express.Router();
import { protect } from "../middleware/protect.js";
import {
  bookRide,
  acceptBooking,
  cancelRide,
  rejectBooking,
  completeRide,
  getPendingBookings,
  getConfirmedDriverDetails,
  getAllBooking,
  getAllBookingByUser
} from "../controllers/booking.controller.js";

router.get("/bookings/pending", protect, getPendingBookings);
router.get("/bookings/:id/driver", protect, getConfirmedDriverDetails);
router.get("/bookings/all", protect, getAllBooking);
router.get("/bookings/user/bookings", protect, getAllBookingByUser);

router.post("/bookings", protect, bookRide);
router.patch("/bookings/:id/accept", protect, acceptBooking);
router.patch("/bookings/:id/reject", protect, rejectBooking);
router.patch("/bookings/:id/cancel", protect, cancelRide);
router.patch("/bookings/:id/complete", protect, completeRide);

export default router;
