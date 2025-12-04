import { useRef, useEffect, useState } from 'react'
import BookRideComponent from '../../components/BookRide';
import Driverinfo from '../../components/Driverinfo';
import RideRequested from '../../components/RideRequested';
import { ekpomaStops } from '../../utils/MockAddress';
import {drawRouteOnMap} from '../../utils/DrawRouteOnMap';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import SideBar from '../../layout/SideBar';
import { useAuthStore } from '../../store/UserAuth';
import {useBookStore} from '../../store/useBooking'
import { toast } from 'react-toastify';
import { socket } from "../../store/socket";
import Notification from '../../components/Notification';
import { useBroadcastStore } from "../../store/useBroadcastStore";

const center = {
  lat: 6.7446,
  lng: 6.0846,
};

function BookRide() {

  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const mapRef = useRef<any>(null)
  const originMarkerRef = useRef<any>(null);
  const destinationMarkerRef = useRef<any>(null);
  const mapContainerRef = useRef<any>(null)
  
  const pickupStop = ekpomaStops.find((stop) => stop.address === selectedOrigin);
  const dropoffStop = ekpomaStops.find((stop) => stop.address === selectedDestination);

  const {user} = useAuthStore()
  const {bookRide,driveBooked,pickup, dropoff,acceptedRideBolean} = useBookStore()
  const setBroadcastData = useBroadcastStore((s:any) => s.setBroadcastData);
  const broadcastData = useBroadcastStore((s:any) => s.broadcastData); // optional

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
      const booking = await bookRide(pickupStop.lat, pickupStop.lon, dropoffStop.lat, dropoffStop.lon)

      socket.emit("UserBooked", {
        objectTravel,
        pickupStop,
        dropoffStop,
        booking,
      });

      addMarker([pickupStop.lon, pickupStop.lat], "A", originMarkerRef);
      addMarker([dropoffStop.lon, dropoffStop.lat], "B", destinationMarkerRef);   
      await drawRouteOnMap(pickupStop, dropoffStop, mapRef);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Error booking ride");
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;
    if (!bookRide) return;
      // addMarker([pickup.lon, pickup.lat], "A", originMarkerRef);
      // addMarker([dropoff.lon, dropoff.lat], "B", destinationMarkerRef);

      drawRouteOnMap(
        pickup,
        dropoff,
        mapRef
      );
    
  }, [pickup, dropoff]);

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

  //   useEffect(() => {
  //   if (!("geolocation" in window.navigator)) {
  //     console.error("Geolocation not supported");
  //     return;
  //   }

  //   const watchId = window.navigator.geolocation.watchPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       console.log("Driver location:", latitude, longitude);
  //       socket.emit("driverLocation", { latitude, longitude });
  //     },
  //     (err) => console.error(err),
  //     { enableHighAccuracy: true }
  //   );

  //   return () => navigator.geolocation.clearWatch(watchId);
  // }, []);

  useEffect(() => {    
  if (!user?.user?._doc || !user?.user?._doc.isVerified) return;

  const handleConnect = () => {
    console.log("Socket connected:", socket.id);
    socket.emit("registerDriver", user.user._doc);
  };

  const handleBroadcast = (data: any) => {
    console.log("Ride request received:", data);
    console.log("User socket ID:", data.userSocketId);

    const id = data.booking.id || data.booking;

    setBookingId(id);
    setBroadcastData(data);
    setShowNotification(true);
  };

  socket.on("connect", handleConnect);
  socket.on("broadcastToVerifiedDrivers", handleBroadcast);

  return () => {
    socket.off("connect", handleConnect);
    socket.off("broadcastToVerifiedDrivers", handleBroadcast);
  };

}, []); 

  
  return (
    <div className="py-5 z-1">
     <SideBar/>

      <div className="md:flex md:px-20 px-5  m-2 md:space-x-8 mt-10">
        {
          driveBooked ? (
            <RideRequested />
          ) : broadcastData ? (
            <Driverinfo />
          ) : (
            <BookRideComponent
              selectedOrigin={selectedOrigin}
              setSelectedOrigin={setSelectedOrigin}
              selectedDestination={selectedDestination}
              setSelectedDestination={setSelectedDestination}
              calculateRoute={handleBooking}
            />
          )
        }
          <Notification
            open={showNotification}
            onClose={() => setShowNotification(false)}
            message="You have a new ride request!"
            onRedirect={`requests/${bookingId}`}
            duration={60000} // auto-close after 1 minute
          />
        <div
          ref={mapContainerRef}
          className="w-full h-[500px] rounded-xl"
        />
      </div>
    </div>
  );
}

export default BookRide;
