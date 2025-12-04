import { socket } from "../store/socket";
import { useBroadcastStore } from "../store/useBroadcastStore";

export function initDriverListener(user) {
  if (!user?.user?._doc?.isVerified) return;

  const { setBroadcastData } = useBroadcastStore.getState() as any

  // Avoid multiple listeners
  socket.off("broadcastToVerifiedDrivers");

  socket.on("broadcastToVerifiedDrivers", (data) => {
    console.log("🔥 GLOBAL BROADCAST TO DRIVER:", data);
    setBroadcastData(data);  // <-- Works everywhere
  });
}
