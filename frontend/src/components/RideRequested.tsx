import { MapPin,WalletMinimal,ArrowRight } from "lucide-react"

function RideRequested() {
  return (
    <div className="md:w-1/3 h-fit border-2 border-gray-100 rounded-xl p-4 shadow-xs">
      <div>
        <h1 className="font-bold text-xl text-center">Ride Requested</h1>
        <p className="font-light  text-center">Finding drivers nearby...</p>
      </div>
      <div className="mt-5" >
        <div className="flex items-start gap-3">
          <MapPin className="text-green-500" />
          <div>
            <p className="text-sm text-gray-600">Pickup</p>
            <p className="font-semibold">{"AAU main gate"}</p>
          </div>
        </div>

        <div className="flex items-center my-5 justify-center">
          <ArrowRight />
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="text-red-500" />
          <div>
            <p className="text-sm text-gray-600">Destination</p>
            <p className="font-semibold">{"faculty of Physical science"}</p>
          </div>
        </div>
        <p className="flex mt-5"> <WalletMinimal/> <span className="mx-3 font-semibold ">Cash</span></p>
      </div>
      <div className=" bg-gray-100 hover:bg-gray-200 text-center py-3 px-6 rounded-xl mt-5 text-red-500 font-semibold">Cancel ride</div>
    </div>
  )
}

export default RideRequested
