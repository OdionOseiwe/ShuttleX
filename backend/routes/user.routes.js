import express from "express"
const router = express.Router()
import {protect} from '../middleware/protect.js'
import {signUp, login, logout,checkAuth,approveDriver,getPendingDrivers} from '../controllers/User.controller.js'

router.get('/check-auth',protect,checkAuth);
router.get('/pending-bookings', protect, getPendingDrivers);

router.post('/approve-driver', protect, approveDriver);
router.post('/signup',signUp);
router.post('/login',login);
router.post('/logout',logout);

export default router // connected to server.js