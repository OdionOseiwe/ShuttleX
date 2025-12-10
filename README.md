# 🚐 ShuttleX – Smart Shuttle Booking System

ShuttleX is a real-time shuttle booking platform designed for universities and organizations.  
It allows **students** to book shuttles, **drivers** to accept/complete rides, and **admins** to manage the platform.  
Built using **React + TypeScript**, **Node.js**, **Express**, **MongoDB**, and **Socket.IO**.

---

## ✨ Features

### 👨‍🎓 Student
- Book a shuttle (Pickup → Destination)
- View active & past rides
- Cancel a pending ride
- Live map to track driver location
- User profile management

### 🚐 Driver
- Receive real-time ride requests
- Accept or Reject bookings
- View current assigned ride
- Update live GPS location
- Complete ride workflow

### 🛠 Admin
- Manage students
- Manage drivers
- View all rides in the system
- Block/unblock accounts

### 🔌 System Features
- Real-time notifications (Socket.IO)
- Role-based navigation & UI
- Secure authentication (JWT)
- Mobile-friendly responsive UI
- Google Maps integration for GPS tracking

---

## 🛠 Tech Stack

### Frontend
- React (TypeScript)
- TailwindCSS
- Socket.IO Client
- React Router
- Mapbox API

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO Server
- JWT Authentication

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/OdionOseiwe/ShuttleX.git

# Navigate into the project
cd ShuttleX

# Install backend dependencies
npm install

# Navigate to the frontend
cd frontend

# Install frontend dependencies
npm install

```

enter your keys in the env file for frontend and backend
```bash
MONGOURL = mongodb+srv://urle_xample
PORT = 9000
JWT_SECRET = seceretToken
NODE_ENV = development | production
```
```bash
VITE_BACKEND_URL=TriRide/api
VITE_BACKEND_URL_SOCKET="https://shuttlex.onrender.com"
```

### Usage

Backend
```bash
npm run dev
```

frontend
```bash
npm run dev
```
