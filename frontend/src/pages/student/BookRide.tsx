import {  Loader } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import BookRideComponent from '../../components/BookRide';
import Driverinfo from '../../components/Driverinfo';
import RideRequested from '../../components/RideRequested';
import { useState, useRef } from 'react';
import SideBar from '../../layout/SideBar';
// Allow global google namespace
declare global {
  interface Window {
    google: any;
  }
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 6.7446,
  lng: 6.0846,
};

function BookRide() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries: ['places'],
  });

  const [directionResponse, setDirectionResponse] = useState<any>(null);
  const [direction, setDirection] = useState('');
  const [duration, setDuration] = useState('');


  const originInputRef = useRef<HTMLInputElement | null>(null);
  const destinationInputRef = useRef<HTMLInputElement | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const calculateRoute = async () => {
    if (!originInputRef.current?.value || !destinationInputRef.current?.value) return;

    const directionService = new window.google.maps.DirectionsService();
    
    const results = await directionService.route({
      origin: originInputRef.current.value,
      destination: destinationInputRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionResponse(results);
    setDirection(results.routes[0].legs[0].distance?.text || '');
    setDuration(results.routes[0].legs[0].duration?.text || '');
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={50} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-5 z-1">
     
     <SideBar/>

      <div className="md:flex md:px-20 px-10  m-2 md:space-x-8 mt-10">
        {/* <BookRideComponent originInputRef={originInputRef} destinationInputRef={destinationInputRef} calculateRoute={calculateRoute}/> */}
        <Driverinfo/>
        <div className="w-full h-150 rounded-xl">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            options={{
              fullscreenControl: false,
              zoomControl: false,
              streetViewControl: false,
              rotateControl: false,
            }}
          >
            <Marker position={center} />
            {directionResponse && <DirectionsRenderer/>}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}

export default BookRide;
