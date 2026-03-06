import SideBar from '../../layout/SideBar';
import {useAuthStore} from '../../store/UserAuth'
import { useState } from "react";
import { motion} from 'framer-motion'
import Notification from '../../components/Notification';
import {useBroadcastStore} from '../../store/useBroadcastStore'
import {useBookStore} from '../../store/useBooking'
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0},
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" }
  }
};

export default function UpdateProfile() {
  const { setRideCompleted, rideCompleted,rideCancelled, setRideCancelled,resetBroadcast,rideRejected,setRideRejected } = useBroadcastStore();
  const {showNotification,hideNotification,bookingId,resetRideState} = useBookStore()
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [mobileNumber, setMobileNumber] = useState(0);
  const [editing, setEditing] = useState(false);
  const {user,updateDriverProfile,updateUserProfile} = useAuthStore();
  const navigate = useNavigate();

  
  const handleUpdateDriver = async() => { 
    try {
      await updateDriverProfile(vehicleType, vehicleNumber, capacity, mobileNumber);
      setEditing(false);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateUser = async() => {
    try {
      await updateUserProfile(mobileNumber);
      setEditing(false);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <motion.div 
    variants={fadeUp}
    initial='hidden'
    whileInView='show'
    className="py-5 z-1">
        <SideBar/>
        <div className="md:p-10 p-5">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome {user?.user?.name}</h1>
              <p className="text-gray-500 text-sm">{new Date(user?.user?.createdAt).toLocaleString()}</p>
            </div>
            {/* <div className="flex items-center gap-4">
              <img
                src="/avatar.png"
                className="w-10 h-10 rounded-full border"
              />
            </div> */}
          </div>

          <div className="bg-white border-gray-100 border rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="md:flex items-center gap-4">
                <img
                  src="/profile.png"
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-bold">{user?.user?.name}</h2>
                  <p className="text-gray-500">{user?.user?.email}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (editing && user?.user?.role === "driver") {
                    handleUpdateDriver();
                  } else if (editing && user?.user?.role === "student") {
                    handleUpdateUser();
                  }else {
                    setEditing(true);
                  }
                }}
                className="bg-gray-200 px-6"
              >
                {editing ? "Save" : "Edit"}
              </button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block mb-1 font-medium">{user?.user?.mobileNumber}</label>
                <input className='p-2 outline-none' onChange={(e)=>setMobileNumber(Number(e.target.value))} placeholder="mobile number" disabled={!editing} />
              </div>

                {
                    user?.user?.role === "driver" &&(
                        <>
                            <div>
                                <label className="block mb-1 font-medium">{user?.user?._doc?.vehicleType}</label>
                                <select
                                  className="w-full p-3 mt-4 bg-gray-100 rounded-xl outline-none cursor-pointer
                                        border-2 border-transparent focus:border-black focus:bg-white"
                                 value={vehicleType} disabled={!editing} onChange={(e)=>setVehicleType(e.target.value)}  name="vehicle_type">
                                    <option value="" >choose vehicle type</option>
                                    <option value="bus" >bus</option>
                                    <option value="keke" >keke</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium"> {user?.user?._doc?.vehicleNumber}</label>
                                <input onChange={(e)=>setVehicleNumber(e.target.value)} placeholder="vehicle number" disabled={!editing} />
                            </div> 
                            <div>
                                <label className="block mb-1 font-medium">{user?.user?._doc?.capacity}</label>
                                <input onChange={(e) => setCapacity(Number(e.target.value))} placeholder="capacity" disabled={!editing} />
                            </div>
                        </> 
                    )
                }
              
            </div>
          </div>
        </div>
        <Notification
            open={showNotification}
            onClose={() => hideNotification()}
            message="You have a new ride request!"
            onRedirect={`requests/${bookingId}`}
            duration={60000} // auto-close after 1 minute
          />

          <Notification
            open={rideCancelled}
            onClose={() => {
              setRideCancelled(false); 
              resetRideState();
              resetBroadcast();
            }}
            message="Ride cancelled by passenger!"
            duration={60000}
        />

          <Notification
            open={rideRejected}
            onClose={() => {
              setRideRejected(false); 
              resetRideState();
              resetBroadcast();
            }}
            message="Ride cancelled by driver!"
            duration={60000}
          />

          <Notification
            open={rideCompleted}
            onClose={() => {
              setRideCompleted(false); 
              resetRideState();
              resetBroadcast();
            }}
            message="Ride completed!"
            duration={60000}
          />
      </motion.div>
  );
}

