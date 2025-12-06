import { socket } from "../store/socket";
import { useBroadcastStore } from "../store/useBroadcastStore";
import { useBookStore } from "../store/useBooking";

export function initGlobalSocketListeners(user: any) {
  const { setRideBookedBroadcastData,setRideAcceptedBroadcastData } = useBroadcastStore.getState();
  const {  triggerNotification } = useBookStore.getState();

  socket.off("connect");
  socket.off("broadcastToVerifiedDrivers");
  socket.off("bookingAccepted");

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

}
