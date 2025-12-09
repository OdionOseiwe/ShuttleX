import SideBar from "../../layout/SideBar";
import NotificationList from "../../components/NotificationList";
import Notification from "../../components/Notification";
import {useBroadcastStore} from '../../store/useBroadcastStore'
import {useBookStore} from '../../store/useBooking'

type driverNotificationsType = {
  id: number;
  title: string;
  time: string;
  read: boolean;
};
function Notifications() {
      const { setRideCompleted, rideCompleted,rideCancelled, setRideCancelled,resetBroadcast,rideRejected,setRideRejected } = useBroadcastStore();
      const {showNotification,hideNotification,bookingId,resetRideState} = useBookStore()

  const driverNotifications: driverNotificationsType[] = [
    {
      id: 1,
      title: "New ride request from AAU main gate",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "Rider cancelled trip #3302",
      time: "2 mins ago",
      read: true,
    },
  ];
  return (
    <div className="py-5 z-1 ">
      <SideBar />
      <NotificationList />
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
  );
}

export default Notifications;
