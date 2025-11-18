import { MapPin, ArrowRight, WalletMinimal, Timer } from "lucide-react";

function DriverRideRequest({}) {
  return (
    <div className="md:w-1/3 m-auto mt-30  w-full border-2 border-gray-200 rounded-xl p-5 shadow-md bg-white">
      
      <h2 className="text-xl font-bold text-center mb-4">
        🚗 New Ride Request
      </h2>

      <div className="space-y-4">

        <div className="flex items-start gap-3">
          <MapPin className="text-green-500" />
          <div>
            <p className="text-sm text-gray-600">Pickup</p>
            <p className="font-semibold">{"AAU main gate"}</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRight />
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="text-red-500" />
          <div>
            <p className="text-sm text-gray-600">Destination</p>
            <p className="font-semibold">{"faculty of Physical science"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <Timer />
          <p className="font-medium">{3} mins away ({"km"} km)</p>
        </div>

        <div className="flex items-center gap-3">
          <WalletMinimal />
          <p className="font-medium">₦{400}</p>
        </div>

      </div>

      <button
        // onClick={onAccept}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl mt-6 font-bold transition"
      >
        ACCEPT RIDE
      </button>
    </div>
  );
}

export default DriverRideRequest;
