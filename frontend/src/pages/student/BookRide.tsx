import { UserRound, ChevronDown, ChevronUp, Loader } from 'lucide-react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
}

function BookRide() {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: 'AIzaSyCxK6Dh0m5NoDBguRkgjKNidqvYvnregXc',
    })

    if(!isLoaded){
      return(
        <div className="flex justify-center items-center h-screen">
          <Loader size={50} color="black" className="animate-spin" />
        </div>
      )
    }
    
  return (
    <div className='md:px-20 px-10 py-5'>
      <div className='flex justify-between py-2 border-b-4 border-gray-200'>
        <h1 className='text-2xl font-semibold cursor-pointer'>ShuttleX</h1>
        <div className='flex space-x-3 items-center' >
            <UserRound className='bg-radial from-white to-gray-300 rounded-full text-gray-400' size={35}/>
            <ChevronDown/>
        </div>
      </div>
      <div className='md:flex m-2 md:space-x-8 mt-10'>
        <div className='md:w-1/3 h-70 border-2 border-gray-100 rounded-xl p-4'>
            <h1 className='text-xl font-semibold'>Get a ride</h1>
            <form  action="">
              <input
                placeholder='Pickup location'
                className='w-full p-3 mt-4 bg-gray-100 rounded-xl outline-none 
                           border-2 border-transparent
                           focus:border-black focus:bg-white 
                           transition-all duration-300 ease-in-out'
                type="text"
              />
              <input
                placeholder='Dropoff location'
                className='w-full p-3 mt-4 bg-gray-100 rounded-xl outline-none 
                           border-2 border-transparent
                           focus:border-black focus:bg-white 
                           transition-all duration-300 ease-in-out'
                type="text"
              />
              <button className='w-full p-3 mt-4 bg-black text-white md:text-xl font-semibold rounded-xl '>
                Search
              </button>
            </form>
        </div>
        <div className="w-full h-150 rounded-xl">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
              options={{
                zoomControl:false,
                streetViewControl:false,
                mapTypeControl:false,
                fullscreenControl:false
              }}         
          >
          </GoogleMap>
        </div>

      </div>
    </div>
  )
}

export default BookRide
