import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {useBookStore} from '../store/useBooking'
import { ekpomaStops } from '../utils/MockAddress';
import {
  CheckCircle,
  XCircle,
  Car,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type RideStatus = "confirmed" | "completed";

const ITEMS_PER_PAGE = 10;

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RideStatus>("confirmed");
  const { getAllBooking,allBookings, isLoading } = useBookStore();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  useEffect(() => {
    getAllBooking?.();
  }, [])

  const [currentPage, setCurrentPage] = useState(1);

  // Filter rides
  const filteredRides = useMemo(() => {
  if (!allBookings?.data || !Array.isArray(allBookings.data)) return [];
  return allBookings.data.filter((ride: any) => ride.status === activeTab)
   .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );;
}, [allBookings, activeTab]);
console.log(allBookings);


  // Reset page when switching tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredRides.length / ITEMS_PER_PAGE);

  const paginatedRides = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRides.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredRides]);

  return (
    <div className="min-h-screen md:px-6 px-2">
      <h1 className="text-3xl font-bold mb-6">Admin Ride Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("confirmed")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "confirmed"
              ? "bg-green-600 text-white"
              : "bg-white shadow"
          }`}
        >
          <CheckCircle size={18} />
          Active Rides
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "completed"
              ? "bg-blue-600 text-white"
              : "bg-white shadow"
          }`}
        >
          <XCircle size={18} />
          completed Rides
        </button>
      </div>
     {isLoading && 
        <div className="text-center text-gray-500">Loading rides...</div>
     }
  
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        <AnimatePresence mode="wait">
            {paginatedRides.length === 0 && !isLoading && (
              <div className="col-span-full text-center text-gray-500 py-10">
                {activeTab === "confirmed"
                  ? "Confirmed rides not found"
                  : "Completed rides not found"}
              </div>
            )}
          {paginatedRides.map((ride: any) => (
            
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
            >
                {/* // date and time of ride request */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">{formatDate(ride.createdAt)}</h2>
                <Car className="text-gray-500" size={20} />
              </div>

              <p className="text-sm text-gray-600">
                <strong>Passenger:</strong> {ride.user?.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Pickup:</strong> {ekpomaStops.find((stop) => stop.lon === ride.start.lng)?.address || "Unknown location"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Destination:</strong> {ekpomaStops.find((stop) => stop.lon === ride.destination.lng)?.address || "Unknown location"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Vehicle number:</strong> {ride.driver?.vehicleNumber}
              </p>
              
              <div className="mt-4">
                {ride.status === "confirmed" ? (
                  <span className="text-green-600 text-sm font-medium">
                    ● Active
                  </span>
                ) : (
                  <span className="text-blue-600 text-sm font-medium">
                    ● completed
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="p-2 rounded-lg bg-white shadow disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg font-medium ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white shadow"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-2 rounded-lg bg-white shadow disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;