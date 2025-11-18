import { StandaloneSearchBox } from "@react-google-maps/api";
import React from "react";

type BookRideProps = {
  originInputRef: React.RefObject<HTMLInputElement | null>,
  destinationInputRef: React.RefObject<HTMLInputElement | null>,
  calculateRoute: () => Promise<void>
}


function BookRideComponent({originInputRef,destinationInputRef,calculateRoute}:BookRideProps): React.JSX.Element {
  
  return (
    <div className="md:w-1/3 h-fit border-2 border-gray-100 rounded-xl p-4">
          <StandaloneSearchBox
            // onLoad={(ref) => (originBoxRef.current = ref)}
          >
            <input
              ref={originInputRef}
              placeholder="Pickup location"
              className="w-full p-3 mt-4 bg-gray-100 rounded-xl outline-none 
                        border-2 border-transparent focus:border-black focus:bg-white"
              type="text"
            />
          </StandaloneSearchBox>

          <StandaloneSearchBox
            // onLoad={(ref) => (destinationBoxRef.current = ref)}
          >
            <input
              ref={destinationInputRef}
              placeholder="Dropoff location"
              className="w-full p-3 mt-4 bg-gray-100 rounded-xl outline-none 
                        border-2 border-transparent focus:border-black focus:bg-white"
              type="text"
            />
          </StandaloneSearchBox>
          <button
            type="button"
            onClick={calculateRoute}
            className="w-full p-3 mt-4 bg-black text-white font-semibold rounded-xl"
          >
            Request KeKe
          </button>
        </div>
  )
}

export default BookRideComponent
