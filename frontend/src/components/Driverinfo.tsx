import { WalletMinimal, MapPin, ArrowRight } from "lucide-react";
import { useAuthStore } from "../store/UserAuth";
import { useBookStore } from "../store/useBooking";
import { useBroadcastStore } from "../store/useBroadcastStore";
import { socket } from "../store/socket";
import {motion} from 'framer-motion'
import { toast } from "react-toastify";

function Driverinfo({ id }: { id: any }) {
  const { cancelRide, rejectRide,completeRide,resetRideState } = useBookStore();
  const { rideBookedbroadcastData, rideAcceptedBroadcastData,resetBroadcast } = useBroadcastStore();
  const { user } = useAuthStore();

  const role = user?.user?.role; 

  const rideData =
    role === "student"
      ? {
          name: "driver",
          mobile: rideAcceptedBroadcastData?.driver?.msg?.driver?.mobileNumber,
          pickup: rideAcceptedBroadcastData?.bookingDetails?.pickupStop?.address,
          dropoff: rideAcceptedBroadcastData?.bookingDetails?.dropoffStop?.address,
        }
      : {
          id:rideBookedbroadcastData?.booking,
          name: rideBookedbroadcastData?.bookingDetails?.user?.name,
          mobile: rideBookedbroadcastData?.bookingDetails?.user?.mobileNumber,
          pickup: rideBookedbroadcastData?.pickupStop?.address,
          dropoff: rideBookedbroadcastData?.dropoffStop?.address,
        };

  const cancelRideByDriver = async () => {
    try {
      console.log("ride to be rejected",rideData.id);
      await rejectRide(rideData.id);
      socket.emit("driverRejectedRide",{
        userId: rideBookedbroadcastData.userId,
        driverId: user?.user?._id
      })
      // clean up functions for zustand
      resetRideState();
      resetBroadcast();
      toast.success("Ride rejected")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Error occured while rejectimg ride"); 
    }
  };

  const completeRideByDriver = async () => {
    try {
      console.log("ride to be completed",rideData.id);
      await completeRide(rideData.id);
      socket.emit("driverCompleteRide",{
        userId: rideBookedbroadcastData.userId,
        driverId: user?.user?._id
      })
      // clean up functions for zustand
      resetRideState();
      resetBroadcast();
      toast.success("Ride completed")

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Error occured while completing ride"); 
    }
  };

  const cancelRideByPassenger = async () => {
    try {
      await cancelRide(id);
      socket.emit("userCancelledRide",{
        userId: user?.user?._id,
        driverId: rideAcceptedBroadcastData.driverId
      })

      // clean up functions for zustand
      resetRideState();
      resetBroadcast();
      toast.success("Ride cancelled")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Error occured while cancelling"); 
    
    }
  };

  const whatsappLink = `https://wa.me/${rideData?.mobile ?? ""}`;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x:0, transition:{duration:1.0} }}

    className="md:w-1/3 h-fit border-2 border-gray-100 rounded-xl p-4 shadow-xs">
      <h1 className="font-bold text-2xl text-center border-b-2 border-gray-100 py-3">
        Travel time in 4mins
      </h1>

      <p className="font-semibold py-2 text-xl text-center">{rideData?.name ?? "N/A"}</p>

      <a href={whatsappLink} target="_blank" className="font-semibold py-2 flex justify-center items-center">
        <img
          className="w-10 h-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/2062095_application_chat_communication_logo_whatsapp_icon.svg/2048px-2062095_application_chat_communication_logo_whatsapp_icon.svg.png"
          alt=""
        />
        <span className="mx-3">+{rideData?.mobile}</span>
      </a>

      <div className="flex mt-5 items-start gap-3">
        <MapPin className="text-green-500" />
        <div>
          <p className="text-sm text-gray-600">Pickup</p>
          <p className="font-semibold">{rideData?.pickup}</p>
        </div>
      </div>

      <div className="flex items-center my-4 justify-center">
        <ArrowRight />
      </div>

      <div className="flex items-start gap-3">
        <MapPin className="text-red-500" />
        <div>
          <p className="text-sm text-gray-600">Destination</p>
          <p className="font-semibold">{rideData?.dropoff}</p>
        </div>
      </div>

      <p className="flex mt-5">
        <WalletMinimal />
        <span className="mx-3 font-semibold">Cash</span>
      </p>

      {user?.user?.role === "student" && (
        <button
          onClick={cancelRideByPassenger}
          className="w-full bg-gray-100 hover:bg-gray-200 text-center py-3 px-6 rounded-xl mt-5 text-red-500 font-semibold"
        >
          Cancel ride
        </button>
      )}

      {user?.user?.role === "driver" && (
        <>
          <button
            onClick={cancelRideByDriver}
            className="w-full bg-gray-100 hover:bg-gray-200 text-center py-3 px-6 rounded-xl mt-5 text-red-500 font-semibold"
          >
            Reject ride
          </button>

          <button
            onClick={completeRideByDriver}
            className="w-full bg-gray-100 hover:bg-gray-200 text-center py-3 px-6 rounded-xl mt-5 text-green-500 font-semibold"
          >
            Complete ride
          </button>
        </>
      )}
    </motion.div>
  );
}

export default Driverinfo;
