import express from "express"
const router = express.Router()
import {protect} from '../middleware/protect.js'
import {bookRide, acceptBooking, cancelRide, completeRide, getPendingBookings, } from '../controllers/booking.controller.js'

router.get('/get-pending-bookings',protect,getPendingBookings);

router.post('/book-ride',protect,bookRide);
router.post('/accept-booking',protect,acceptBooking);
router.post('/cancel-ride',protect,cancelRide);
router.post('/complete-ride',protect,completeRide);

export default router // connected to server.js