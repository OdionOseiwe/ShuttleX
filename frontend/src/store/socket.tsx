import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL_SOCKET
    : "http://localhost:5000";

export const socket = io(URL, {
  transports: ["websocket"],
});
