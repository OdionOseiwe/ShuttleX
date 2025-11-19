import React from "react";
import { ekpomaStops } from "../utils/MockAddress";

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
    <div className="md:w-1/3 h-fit border-2 border-gray-100 rounded-xl p-4">
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
          Request KeKe
        </button>
      </form>
    </div>
  );
}

export default BookRideComponent;
