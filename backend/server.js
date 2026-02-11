import express from 'express'
import cookieParser from "cookie-parser";
import cors from "cors";
import path, { dirname, join } from "path";
import { createServer } from 'node:http';
import { fileURLToPath } from "url";
import { Server } from 'socket.io';
import { ConnectMongoDB } from './config/db.js';
import bookingRoutes from'./routes/bookings.routes.js'
import userRoutes from './routes/user.routes.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://shuttlex-client-domain.com"
    ],
    methods: ["GET", "POST"],
  }
});


// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// const app = express()
// const __dirname = path.resolve();

// cors configuration
// formally the frontend is running on localhost:3000 and backend on localhost:5000
// so the browser will block the request from frontend to backend due to CORS policy
// to avoid this we need to enable CORS on the backend and allow the frontend to access the backend
// by setting origin to frontend url and credentials to true to allow cookies to be sent with the request
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://shuttlex.onrender.com"
  ],
  credentials: true
}));

app.use(cookieParser())
app.use(express.json());

app.use('/TriRide/api/user', userRoutes)
app.use('/TriRide/api/booking', bookingRoutes)

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("registerUser", (user) => {
    if (!user?._id) return;

    const userId = user._id.toString();
    socket.join(userId);
    console.log(`User ${userId} joined room: ${userId}`);
    console.log("Rooms after registerUser:", io.sockets.adapter.rooms);
  });

  socket.on("registerDriver", (driver) => {
    if (!driver?._id) return;

    const driverId = driver._id.toString();
    socket.join(driverId);

    if (driver.isVerified === true) {
      socket.join("verifiedDrivers");
      console.log(`Verified driver joined verifiedDrivers: ${driverId}`);
    }
  });

  socket.on("UserBooked", (data) => {
    console.log("User booked a ride:", data);

    const userId = data.userId;
    data.userId = userId;

    io.to("verifiedDrivers").emit("broadcastToVerifiedDrivers", data);
    console.log("Broadcasted to all verified drivers");
  });

  socket.on("rideAccept", (data) => {
    console.log("Driver accepted ride:", data);

    const { userId } = data;

    io.to(userId).emit("bookingAccepted", data);
    console.log(`Sent bookingAccepted to user room: ${userId}`);
  });

  socket.on("driverRejectedRide", (data) => {
    console.log("Driver rejected ride:", data);

    const { userId, driverId } = data;
    if (!userId) return;

    // Notify the User
    io.to(userId).emit("rideRejectedByDriver", {
      status: "rejected",
      driverId,
      ...data,
    });

    console.log(`Notified user (${userId}) ride was rejected by driver`);
  });

  socket.on("driverCompleteRide", (data) => {
    console.log("Driver completed ride:", data);

    const { userId, driverId } = data;
    if (!userId) return;

    io.to(userId).emit("rideCompleted", {
      status: "completed",
      driverId,
      ...data,
    });

    console.log(`Notified user (${userId}) ride is completed`);
  });

  socket.on("userCancelledRide", (data) => {
    console.log("User cancelled ride:", data);

    const { driverId, userId } = data;
    if (!driverId) return;

    io.to(driverId).emit("rideCancelledByUser", {
      status: "cancelled",
      userId,
      ...data,
    });

    console.log(`Notified driver (${driverId}) that user cancelled the ride`);
  });
});


// serving static files in production
// So the express server can serve the react frontend
// normally the react frontend is built and served by a separate server
// but in production we can serve the built react frontend with the express server
// by using express.static middleware to serve the static files from the build folder
if (process.env.NODE_ENV === "production") {
    // for vite react
  const frontendBuildPath = join(__dirname, "../frontend/dist");

  // Serve static files
  app.use(express.static(frontendBuildPath));

  //  for other routes that are not from the Api endpoints like dashboard, home, developer e.t.c
  app.use((req, res, next) => {
    if (req.path.startsWith("/TriRide/api")) return next();
    res.sendFile(join(frontendBuildPath, "index.html"));
  });

  // Optional: CSP headers to allow Google Fonts
  app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; img-src 'self' data:;"
    );
    next();
  });
}

server.listen(process.env.PORT, () => {
    ConnectMongoDB();
    console.log(`Example app listening on port ${process.env.PORT}`)
})