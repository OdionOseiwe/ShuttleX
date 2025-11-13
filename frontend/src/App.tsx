import { io } from "socket.io-client";
import React, { useEffect } from "react";
import { useGeolocated } from "react-geolocated";


function App() {
  // connect to your backend
  const socket = io("http://localhost:5000");
  //  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  //       useGeolocated({
  //           positionOptions: {
  //               enableHighAccuracy: false,
  //           },
  //           userDecisionTimeout: 5000,
  //       });

  // // confirm connection
  // socket.on("connect", () => {
  //   console.log("🔗 Connected to server as:", socket.id);

  // });

  // console.log(isGeolocationEnabled);
  

  useEffect(() => {
    if (!("geolocation" in window.navigator)) {
      console.error("Geolocation not supported");
      return;
    }

    const watchId = window.navigator.geolocation.watchPosition(
      (position) => {
        console.log("Driver location:", position.coords);
        const { latitude, longitude } = position.coords;
        console.log("Driver location:", latitude, longitude);
        socket.emit("driverLocation", { latitude, longitude });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <>
    {/* {
      !isGeolocationAvailable ? <div>{coords?.latitude}</div> : <div>not unavailable</div>
    } */}
      <h1 className="text-blue-500 text-3xl">hello world</h1>
    </>
  )
}

export default App
         