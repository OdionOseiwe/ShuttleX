import express from "express"
const router = express.Router()
import {protect} from '../middleware/protect.js'
import {signUp, login, logout,rejectDriver,updateDriversProfile,updateDriverStatus,checkAuth,approveDriver,getPendingDrivers} from '../controllers/User.controller.js'


// Auth routes
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", protect, checkAuth);

// Admin routes
router.post('/drivers/:id/approve', protect, approveDriver);
router.post('/drivers/:id/reject', protect, rejectDriver);
router.get('/drivers/pending', protect, getPendingDrivers);

// Driver routes
router.patch('/driver/profile', protect, updateDriversProfile);
router.patch('/driver/status', protect, updateDriverStatus);


export default router // connected to server.js