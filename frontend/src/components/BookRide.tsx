import React from "react";
import { ekpomaStops } from "../utils/MockAddress";
import {motion} from 'framer-motion'

type BookRideProps = {
  selectedOrigin: string, 
  setSelectedOrigin: (selectedOrigin:string) => void,
  selectedDestination: string, 
  setSelectedDestination: (selectedDestination:string) => void,
  calculateRoute: () => Promise<void>;
};

function BookRideComponent({
  selectedOrigin,
  setSelectedOrigin,
  selectedDestination,
  setSelectedDestination,
  calculateRoute,
}: BookRideProps) {

  const handleOriginChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrigin(e.target.value);
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDestination(e.target.value);
  }



  return (
    <motion.div 
    initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0, transition:{duration:1.0} }}
    className=" h-fit border-2 border-gray-100 rounded-xl p-4">
      <h1 className="font-bold text-2xl text-center">Book a ride</h1>
      <form>
        <select
          value={selectedOrigin}
          onChange={handleOriginChange}
          className="w-full p-3 mt-4 bg-gray-100 rounded-xl outline-none 
                     border-2 border-transparent focus:border-black focus:bg-white"
        >
          <option value="" disabled>
            Select Pickup location
          </option>
          {ekpomaStops.map((stop, idx) => (
            <option key={idx} value={stop.address}>
              {stop.address}
            </option>
          ))}
        </select>

        <select
          value={selectedDestination}
          onChange={handleDestinationChange}
          className="w-full p-3 mt-4 bg-gray-100 rounded-xl outline-none 
                     border-2 border-transparent focus:border-black focus:bg-white"
        >
          <option value="" disabled>
            Select Dropoff location
          </option>
          {ekpomaStops.map((stop, idx) => (
            <option key={idx} value={stop.address}>
              {stop.address}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={calculateRoute}
          className="w-full p-3 mt-4 bg-black text-white font-semibold rounded-xl"
        >
          Request ride
        </button>
      </form>
    </motion.div>
  );
}

export default BookRideComponent;
