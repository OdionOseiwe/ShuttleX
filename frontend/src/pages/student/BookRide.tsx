import { useRef, useEffect, useState } from 'react'
import BookRideComponent from '../../components/BookRide';
import Driverinfo from '../../components/Driverinfo';
import RideRequested from '../../components/RideRequested';
import { ekpomaStops } from '../../utils/MockAddress';
import {drawRouteOnMap} from '../../utils/DrawRouteOnMap';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import SideBar from '../../layout/SideBar';
import { toast } from 'react-toastify';
import { socket } from "../../store/socket";
import Notification from '../../components/Notification';
import { useBookStore } from "../../store/useBooking";
import { useAuthStore } from '../../store/UserAuth';
import { useBroadcastStore } from '../../store/useBroadcastStore';
import AdminDashboard from '../../components/AdminDashboard';
import { Bus, TruckElectric  } from 'lucide-react';
// notify driver who accepted ride that user cancelled
// notify user that driver cancelled accepted ride 
// notify user that driver completed ride and change back to orginal page layout

const center = {
  lat: 6.7446,
  lng: 6.0846,
};

function BookRide() {
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [rideMode, setRideMode] = useState<"basic" | "comfort" | "">("");
  const [vehicleType, setVehicleType] = useState<"bus" | "keke" | "">("");

  const mapRef = useRef<any>(null)
  const originMarkerRef = useRef<any>(null);
  const destinationMarkerRef = useRef<any>(null);
  const mapContainerRef = useRef<any>(null)
  
  const pickupStop = ekpomaStops.find((stop) => stop.address === selectedOrigin);
  const dropoffStop = ekpomaStops.find((stop) => stop.address === selectedDestination);

  const {bookRide,showNotification,hideNotification,bookingId,acceptedRideBolean,rideBookedBoolean,resetRideState} = useBookStore()
  const { setRideCompleted, rideCompleted,rideCancelled, setRideCancelled,rideAcceptedBroadcastData,resetBroadcast,rideRejected,setRideRejected } = useBroadcastStore();

  const {user} = useAuthStore()

  const addMarker = (coords:any, label:any, markerRef:any) => {
    if (!mapRef.current) return;
    if (markerRef.current) markerRef.current.remove();

    markerRef.current = new mapboxgl.Marker({ color: label === "A" ? "green" : "red" })
      .setLngLat(coords)
      .setPopup(new mapboxgl.Popup().setText(label)) // A or B popup
      .addTo(mapRef.current);
  };

  const handleBooking = async() => {
    if (!pickupStop || !dropoffStop) {
      alert("Invalid address selected");
      return;
    }
    try {
      const travelTime = await fetch(`https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${pickupStop.lon},${pickupStop.lat};${dropoffStop.lon},${dropoffStop.lat}?access_token=${mapboxgl.accessToken}`);
      const travelTimeData = await travelTime.json();

      let objectTravel = travelTimeData.waypoints[0];
      const bookingResult = await bookRide(pickupStop.lat, pickupStop.lon, dropoffStop.lat, dropoffStop.lon,vehicleType, rideMode);
      socket.emit("UserBooked", {
        userId: user?.user?._id, 
        objectTravel,
        pickupStop,
        dropoffStop,
        vehicleType: vehicleType,
        rideType: rideMode, 
        booking: bookingResult?.booking?._id,
        bookingDetails:bookingResult
      });

      console.log("booking id",bookingResult?.booking?._id);

      addMarker([pickupStop.lon, pickupStop.lat], "A", originMarkerRef);
      addMarker([dropoffStop.lon, dropoffStop.lat], "B", destinationMarkerRef);   
      await drawRouteOnMap(pickupStop, dropoffStop, mapRef);
      setSelectedOrigin("")
      setSelectedDestination("")
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.msg || "Error booking ride");
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken =
      "pk.eyJ1Ijoib2Rrb2RlczEyMyIsImEiOiJjbWk1NnltdGwwM3Y5Mmpxemh5eXJpYndtIn0.cS4pZKYF6_G_fSPSrihxzA";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",  
      center: [center.lng, center.lat],
      zoom: 12,
    });
    return () => mapRef.current?.remove();
  }, []);

  
  return (
    <div className="py-5 z-1">
     <SideBar/>
      <div className="md:flex md:px-20 px-5  m-2 md:space-x-8 mt-10">  
        {/* FOR USERS to see the the driverInfo on the frontend       */}
        {
          rideAcceptedBroadcastData && <Driverinfo id={bookingId}/> 
        }

        {/* FOR DRIVERS TO SEE THE RIDE INFO THE ACCEPTED */}
        {acceptedRideBolean  && <Driverinfo id={bookingId}/> }

        {/* FOR USERS TO SEE AFTER THEY BOOKED RIDE */}
        {
          rideBookedBoolean && !rideAcceptedBroadcastData && <RideRequested id={bookingId}/>
        }

        {/* FOR DRIVERS TO SEE ON LAND ON THE PAGE */}
        {
          user?.user?.role === "driver" && !acceptedRideBolean &&
            <div className="md:w-1/3 h-fit border-2 border-gray-100 rounded-xl p-4 shadow-xs text-center text-2xl">
              waiting for ride requests
            </div>
        }


        {/* FOR USERS TO SEE ON LAND ON THE PAGE */}
        {
          user?.user?.role === "student" && !rideBookedBoolean &&
            <div className="md:w-1/3 space-y-4">

      {/* Ride Mode Selection */}
      <div className="border rounded-xl p-4 shadow-sm">
        <h2 className="font-semibold mb-3">Choose Ride Type</h2>

        <div className="flex gap-3">
          <button
            onClick={() => setRideMode("basic")}
            className={`px-4 py-2 rounded-lg ${
              rideMode === "basic" ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            Basic
          </button>

          <button
            onClick={() => setRideMode("comfort")}
            className={`px-4 py-2 rounded-lg ${
              rideMode === "comfort" ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            Comfort
          </button>
        </div>
      </div>

      {/* Vehicle Selection */}
      <div className="border rounded-xl p-4 shadow-sm">
        <h2 className="font-semibold text-center mb-3">Choose Vehicle</h2>

        <div className=''>
          <div className='flex gap-4 justify-between mb-4'>
            <button
            onClick={() => setVehicleType("keke")}
            className={`px-4 py-2 rounded-lg flex ${
              vehicleType === "keke"
                ? "bg-green-600 text-white"
                : "bg-gray-100"
            }`}
            >
            <span>Keke</span>  <TruckElectric className="ml-2"/>
            </button>
            {vehicleType === 'keke' ?<h2 className='font-semibold text-2xl' >&#8358; {rideMode === 'basic' ? "150" : 600}</h2>: ''}
          </div>
            <div className='flex justify-between gap-4'> 
              <button
                onClick={() => setVehicleType("bus")}
                className={`px-4 py-2 flex rounded-lg ${
                  vehicleType === "bus"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100"
                }`}
              >
              <span>Bus</span> <Bus className="ml-2"/>
              </button>
            {vehicleType === 'bus' ?<h2 className='font-semibold text-2xl' >&#8358; {rideMode === 'basic' ? "150" : 2700}</h2>: ''}
            </div>
        </div>
      </div>

      {/* Only show booking form when selections are made */}
      {rideMode && vehicleType && (
        <BookRideComponent
          selectedOrigin={selectedOrigin}
          setSelectedOrigin={setSelectedOrigin}
          selectedDestination={selectedDestination}
          setSelectedDestination={setSelectedDestination}
          calculateRoute={handleBooking}
        />
      )}
    </div>
        }

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

        {
          user?.user?.role === "admin" && 
          <AdminDashboard/>
        }
        {
          (user?.user?.role === "driver" || user?.user?.role === "student") &&
          <div
            ref={mapContainerRef}
            className="w-full h-[500px] rounded-xl"
          />
        }
      </div>
    </div>
  );
}

export default BookRide;
