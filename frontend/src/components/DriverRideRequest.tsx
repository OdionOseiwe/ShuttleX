import { MapPin, ArrowRight, WalletMinimal, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { ekpomaStops } from '../utils/MockAddress';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { socket } from "../store/socket";
import { useBroadcastStore } from "../store/useBroadcastStore";
import { useBookStore } from "../store/useBooking";
import { useAuthStore } from "../store/UserAuth";

// broadcast
function DriverRideRequest({}) {
  const rideBookedbroadcastData = useBroadcastStore((s) => s.rideBookedbroadcastData);
  const { acceptRide} = useBookStore(); 
  const {user} = useAuthStore()

  const navigate = useNavigate();

  if (!rideBookedbroadcastData) return <div className="p-6">Waiting for ride data...</div>;
  
  const pickUpStop = ekpomaStops.find((stop) => stop.lon === rideBookedbroadcastData.pickupStop.lon);
  const dropOffStop = ekpomaStops.find((stop) => stop.lon === rideBookedbroadcastData.dropoffStop.lon);

  const acceptRideByDriver = async () => {
    try {
      const response = await acceptRide(rideBookedbroadcastData.booking);
      console.log("rideAccepted",rideBookedbroadcastData);
      
      socket.emit("rideAccept", {
        userId: rideBookedbroadcastData.userId,
        bookingDetails: rideBookedbroadcastData,
        driver: response,
        driverId: user?.user?._id,

      });

      toast.success("Ride accepted");
      navigate('/book-ride');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <div className="md:w-1/3 m-auto mt-30  w-full border-2 border-gray-200 rounded-xl p-5 shadow-md bg-white">
      
      <h2 className="text-xl font-bold text-center mb-4">
        🚗 New Ride Request
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition:{duration:0.8} }}
        className="space-y-4">

        <div className="flex items-start gap-3">
          <MapPin className="text-green-500" />
          <div>
            <p className="text-sm text-gray-600">Pickup</p>
            <p className="font-semibold">{pickUpStop?.address}</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRight />
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="text-red-500" />
          <div>
            <p className="text-sm text-gray-600">Destination</p>
            <p className="font-semibold">{dropOffStop?.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <Timer />
          <p className="font-medium">{3} mins away ({"km"} km)</p>
        </div>

        <div className="flex items-center gap-3">
          <WalletMinimal />
          <p className="font-medium">₦{400}</p>
        </div>

      </motion.div>

      <button
        onClick={acceptRideByDriver}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl mt-6 font-bold transition"
      >
        {/* {isLoading ? "Accepting ride": "Accept ride"} */} 
        Accept ride
      </button>
    </div>
  );
}

export default DriverRideRequest;
