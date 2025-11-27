import { motion } from "framer-motion";
import { Check, X } from "lucide-react";


export default function ApproveDriverPage({nin,vehicleNumber,vehicleType,email,name,mobileNumber}:
  {
    nin:string, 
    vehicleNumber:string, 
    vehicleType:string,
    email:string, 
    name:string, 
    mobileNumber:string }) {

  return (
    <div className="md:w-2/3 w-full m-auto p-10">
      <h1 className="text-3xl font-bold mb-8">Pending Driver Approvals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* {pendingDrivers.map((driver) => ( */}
          <motion.div
            // key={driver._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="rounded-2xl shadow-md p-4">
                <p className="text-xl p-3 bg-gray-100 my-4 mx-1  rounded-xl">Email:{"   "} <span className="font-semibold">{email}</span> </p>
                <p className="text-xl p-3 bg-gray-100 my-4 mx-1  rounded-xl">Name:{"   "} <span className="font-semibold">{name}</span> </p>
                <p className="text-xl p-3 bg-gray-100 my-4 mx-1  rounded-xl">Phone: {"   "} <span className="font-semibold">{mobileNumber}</span> </p>
                <p className="text-xl p-3 bg-gray-100 my-4 mx-1  rounded-xl">Vehicle Type:{"   "} <span className="font-semibold">{vehicleType}</span></p>
                <p className="text-xl p-3 bg-gray-100 my-4 mx-1  rounded-xl">NIN: {"  "} <span className="font-semibold">{nin} </span></p>
                <p className="text-xl p-3 bg-gray-100 my-4 mx-1  rounded-xl">vehicle Number:{"  "} <span className="font-semibold">{vehicleNumber}</span></p>

                <div className="flex gap-4 mt-4">
                  <button
                    className="cursor-pointer flex bg-green-500 rounded-xl px-4 py-2"
                    // onClick={() => approveDriver(driver._id)}
                  >
                    <Check className="mr-2" /> <span>Approve</span>
                  </button>

                     <button
                    className="cursor-pointer flex bg-red-500 rounded-xl px-4 py-2"
                    // onClick={() => approveDriver(driver._id)}
                  >
                    <X className="mr-2" /> <span>Reject</span>
                  </button>
                </div>
            </div>
          </motion.div>
        {/* ))} */}
      </div>

      {/* {pendingDrivers.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">No pending drivers.</p>
      )}
    </div> */}
     </div>

  );
}
