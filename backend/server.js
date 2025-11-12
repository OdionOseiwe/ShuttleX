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
    origin: "*", // You can restrict this later to your frontend URL
    methods: ["GET", "POST"],
  },
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
app.use(cors({origin:"http://localhost:5173", credentials:true})) // So the frontend can access the backend with cookies 

app.use(cookieParser())
app.use(express.json());

app.use('/TriRide/api/user', userRoutes)
app.use('/TriRide/api/booking', bookingRoutes)

io.on('connection', (socket) => {
  console.log('a user connected');
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
    if (req.path.startsWith("/simupay/api")) return next();
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