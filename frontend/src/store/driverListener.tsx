import { socket } from "../store/socket";
import { useBroadcastStore } from "../store/useBroadcastStore";
import { useBookStore } from "../store/useBooking";

export function initGlobalSocketListeners(user: any) {
  const { setRideCompleted, setRideCancelled,setRideRejected,setRideBookedBroadcastData,setRideAcceptedBroadcastData } = useBroadcastStore.getState();
  const {  triggerNotification } = useBookStore.getState();

  socket.off("connect");
  socket.off("broadcastToVerifiedDrivers");
  socket.off("bookingAccepted");
  socket.off("rideCancelledByUser");
  socket.off("rideRejectedByDriver");
  socket.off("rideCompleted");

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  // broadcast data only available to drivers
  socket.on("broadcastToVerifiedDrivers", (data: any) => {
    console.log("DRIVER RECEIVED BOOKING:", data);
    const booking = data.booking ?? null;
    triggerNotification(booking);
    setRideBookedBroadcastData(data);
  });

  // booking data only available to students or users 
  socket.on("bookingAccepted", (data: any) => {
    console.log("BOOKING ACCEPTED:", data);
    setRideAcceptedBroadcastData(data);
  });

  socket.on("rideCancelledByUser",  (data) => {
      console.log("ride cancelled by user", data);
      setRideCancelled(true);
  })

  socket.on("rideRejectedByDriver", (data) => {
      console.log("ride rejected by driver", data);
      setRideRejected(true);
  });

  socket.on("rideCompleted", (data) => {
      console.log("ride completed by driver", data);
      setRideCompleted(true);
  });

  socket.on("connect_error", (err) => {
    console.log("Socket connect error →", err.message);
  });

}
