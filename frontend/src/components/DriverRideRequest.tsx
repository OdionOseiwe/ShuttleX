import { MapPin, ArrowRight, WalletMinimal, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import {useBookStore} from '../store/useBooking'
import { useParams } from "react-router-dom";
import { ekpomaStops } from '../utils/MockAddress';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { socket } from "../store/socket";
import  {useBroadcastStore} from '../store/useBroadcastStore'


// broadcast
function DriverRideRequest({}) {
    const broadcastData = useBroadcastStore((s:any) => s.broadcastData);
  const { acceptRide, isLoading } = useBookStore();
  const navigate = useNavigate();
console.log(broadcastData);

  if (!broadcastData) return null; // wait until broadcast arrives

  const pickUpStop = ekpomaStops.find((stop) => stop.lon === broadcastData.pickupStop.lon);
  const dropOffStop = ekpomaStops.find((stop) => stop.lon === broadcastData.dropoffStop.lon);

  const acceptRideByDriver = async () => {
    try {
      await acceptRide(broadcastData.booking.id);
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
        {isLoading ? "Accepting ride": "Accept ride"}
      </button>
    </div>
  );
}

export default DriverRideRequest;
