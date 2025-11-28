import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useDriverStore } from "../store/useDriver";
import { toast } from "react-toastify";

export default function ApproveDriverPage({ driver }: { driver?: any }) {
  if (!driver) return null;

  const { approveDriver, isLoading } = useDriverStore();

  const handleApprove = async () => {
    try {
      const response = await approveDriver(driver.id); 
      toast.success("Approval successful");
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Error occurred while approving");
      console.log(error);
      
    }
  };

  return (
    <div className="md:w-1/3 w-full m-auto p-10">
      <h1 className="text-3xl font-bold mb-8">Pending Driver Approvals</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="rounded-2xl shadow-md p-4">

          <p className="text-xl p-3 bg-gray-100 rounded-xl my-4">
            Email: <span className="font-semibold">{driver.email}</span>
          </p>
          <p className="text-xl p-3 bg-gray-100 rounded-xl my-4"> Name: 
            <span className="font-semibold">{driver.name}</span> </p>
          <p className="text-xl p-3 bg-gray-100 rounded-xl my-4"> Phone: 
            <span className="font-semibold">{driver.mobileNumber}</span> </p>
          <p className="text-xl p-3 bg-gray-100 rounded-xl my-4"> Vehicle Type: 
            <span className="font-semibold">{driver.vehicleType}</span> </p>
          <p className="text-xl p-3 bg-gray-100 rounded-xl my-4"> NIN: 
            <span className="font-semibold">{driver.nin}</span> </p>
          <p className="text-xl p-3 bg-gray-100 rounded-xl my-4"> Vehicle Number: 
            <span className="font-semibold">{driver.vehicleNumber}</span> </p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleApprove}
              className="cursor-pointer flex font-semibold bg-green-500 px-4 py-2 rounded-xl"
            >
              <Check className="mr-2" /> {isLoading ? "Approving..." : "Approve"}
            </button>

            <button className="cursor-pointer font-semibold flex bg-red-500 px-4 py-2 rounded-xl">
              <X className="mr-2" /> Reject
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
