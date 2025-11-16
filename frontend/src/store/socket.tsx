import { io } from "socket.io-client";
// import { create } from "zustand";

// export const useSocketStore = create((set) => ({
//   socket: null,
//   connectSocket: () => {
//     const socket = io("http://localhost:5000", {
//       transports: ["websocket"],
//     });
//     set({ socket });
//   },
// }));

 // connect to your backend
//   const socket = io("http://localhost:5000");

//   useEffect(() => {
//     if (!("geolocation" in window.navigator)) {
//       console.error("Geolocation not supported");
//       return;
//     }

//     const watchId = window.navigator.geolocation.watchPosition(
//       (position) => {
//         console.log("Driver location:", position.coords);
//         const { latitude, longitude } = position.coords;
//         console.log("Driver location:", latitude, longitude);
//         socket.emit("driverLocation", { latitude, longitude });
//       },
//       (err) => console.error(err),
//       { enableHighAccuracy: true }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);