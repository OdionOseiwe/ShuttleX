import SideBar from '../../layout/SideBar';
import { Clock, History } from 'lucide-react';
import Notification from '../../components/Notification';
import {useBroadcastStore} from '../../store/useBroadcastStore'
import {useBookStore} from '../../store/useBooking'

function HistoryPage() {
    const { setRideCompleted, rideCompleted,rideCancelled, setRideCancelled,resetBroadcast,rideRejected,setRideRejected } = useBroadcastStore();
    const {showNotification,hideNotification,bookingId,resetRideState} = useBookStore()
    
  return (
    <div className="py-5 z-1">
        <SideBar/>
        <div className="p-10 max-w-4xl mx-auto text-gray-800">
            <h1 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <History />  Activity History
            </h1>


            {/* <div className="space-y-6"> */}
            {/* {history.map((item) => ( */}
            <div  className="shadow-sm rounded-2xl p-4 cursor-pointer bg-gray-100 hover:bg-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-xl font-semibold">Booked a ride</p>
                        <p className="text-gray-600 text-sm">To school gate</p>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="mr-2" />
                        {/* {new Date(item.timestamp).toLocaleString()} */}
                    </div>
                </div>
            </div>
            {/* ))} */}
            {/* </div> */}


            {/* {history.length === 0 && (
            <p className="text-center text-gray-500 mt-10 text-lg">No activity yet.</p>
            )} */}

               <Notification
            open={showNotification}
            onClose={() => hideNotification()}
            message="You have a new ride request!"
            onRedirect={`requests/${bookingId}`}
            duration={60000} // auto-close after 1 minute
          />

          <Notification
            open={rideCancelled}
            onClose={() => {
              setRideCancelled(false); 
              resetRideState();
              resetBroadcast();
            }}
            message="Ride cancelled by passenger!"
            duration={60000}
        />

          <Notification
            open={rideRejected}
            onClose={() => {
              setRideRejected(false); 
              resetRideState();
              resetBroadcast();
            }}
            message="Ride cancelled by driver!"
            duration={60000}
          />

          <Notification
            open={rideCompleted}
            onClose={() => {
              setRideCompleted(false); 
              resetRideState();
              resetBroadcast();
            }}
            message="Ride completed!"
            duration={60000}
          />
        </div>
    </div>
  )
}

export default HistoryPage
