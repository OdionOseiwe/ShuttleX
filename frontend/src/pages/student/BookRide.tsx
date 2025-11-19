import { useRef, useEffect, useState } from 'react'
import BookRideComponent from '../../components/BookRide';
import Driverinfo from '../../components/Driverinfo';
import RideRequested from '../../components/RideRequested';
import { ekpomaStops } from '../../utils/MockAddress';
import {drawRouteOnMap} from '../../utils/DrawRouteOnMap';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import SideBar from '../../layout/SideBar';

const center = {
  lat: 6.7446,
  lng: 6.0846,
};

function BookRide() {
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const mapRef = useRef<any>(null)
  const originMarkerRef = useRef<any>(null);
  const destinationMarkerRef = useRef<any>(null);
  const mapContainerRef = useRef<any>(null)

  const addMarker = (coords:any, label:any, markerRef:any) => {
    if (!mapRef.current) return;

    if (markerRef.current) markerRef.current.remove();

    markerRef.current = new mapboxgl.Marker({ color: label === "A" ? "green" : "red" })
      .setLngLat(coords)
      .setPopup(new mapboxgl.Popup().setText(label)) // A or B popup
      .addTo(mapRef.current);
  };


  const handleBooking = async() => {
    const pickupStop = ekpomaStops.find((stop) => stop.address === selectedOrigin);
    const dropoffStop = ekpomaStops.find((stop) => stop.address === selectedDestination);

    if (!pickupStop || !dropoffStop) {
      alert("Invalid address selected");
      return;
    }
    const travelTime = await fetch(`https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${pickupStop.lon},${pickupStop.lat};${dropoffStop.lon},${dropoffStop.lat}?access_token=${mapboxgl.accessToken}`);
    const travelTimeData = await travelTime.json();
    console.log(travelTimeData);
    
    
    addMarker(pickupStop, "A", originMarkerRef);
    addMarker(dropoffStop, "B", destinationMarkerRef);   
    await drawRouteOnMap(pickupStop, dropoffStop, mapRef);
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

      <div className="md:flex md:px-20 px-10  m-2 md:space-x-8 mt-10">
        <BookRideComponent
          selectedOrigin={selectedOrigin}
          setSelectedOrigin={setSelectedOrigin}
          selectedDestination={selectedDestination}
          setSelectedDestination={setSelectedDestination}
          calculateRoute={handleBooking}
        />

        {/* <Driverinfo/> */}
        <div
          ref={mapContainerRef}
          className="w-full h-[500px] rounded-xl"
        />
      </div>
    </div>
  );
}

export default BookRide;
