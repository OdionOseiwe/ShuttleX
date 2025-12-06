import { MapPin,WalletMinimal,ArrowRight } from "lucide-react"
import { useBookStore } from "../store/useBooking"
import { useBroadcastStore } from "../store/useBroadcastStore";
import {motion} from 'framer-motion'
import { toast } from "react-toastify";

function RideRequested({id}:{id:any}) {
      const { cancelRide, resetRideState } = useBookStore();
      const { resetBroadcast } = useBroadcastStore();

    const cancelRideByPassenger = async()=>{
      try {
        await cancelRide(id); 
        resetRideState();
      resetBroadcast();
      toast.success("Ride cancelled")
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg || "Error occured while cancelling ride"); 
      }
    }
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x:0, transition:{duration:1.0} }}
    className="md:w-1/3 h-fit border-2 border-gray-100 rounded-xl p-4 shadow-xs">
      <div>
        <h1 className="font-bold text-xl text-center">Ride Requested</h1>
        <p className="font-light  text-center">Finding drivers nearby...</p>
      </div>
      <div className="mt-5" >
        <div className="flex items-start gap-3">
          <MapPin className="text-green-500" />
          <div>
            <p className="text-sm text-gray-600">Pickup</p>
            <p className="font-semibold">{"AAU main gate"}</p>
          </div>
        </div>

        <div className="flex items-center my-5 justify-center">
          <ArrowRight />
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="text-red-500" />
          <div>
            <p className="text-sm text-gray-600">Destination</p>
            <p className="font-semibold">{"faculty of Physical science"}</p>
          </div>
        </div>
        <p className="flex mt-5"> <WalletMinimal/> <span className="mx-3 font-semibold ">Cash</span></p>
      </div>
      <button onClick={cancelRideByPassenger} className="w-full bg-gray-100 hover:bg-gray-200 text-center py-3 px-6 rounded-xl mt-5 text-red-500 font-semibold">Cancel ride</button >
    </motion.div>
  )
}

export default RideRequested
