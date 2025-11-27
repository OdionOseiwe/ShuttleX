import { useNotificationStore } from "../store/useNotification";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../layout/SideBar";
import { useAuthStore } from "../store/UserAuth";
import ApproveDriverPage from "./Approve_driver";
import DriverRideRequest from './DriverRideRequest'

function NotificationDetails({}) {
    const {getUserNotificationbyId,notification,setReadNotification} = useNotificationStore()
    const {user} = useAuthStore()
    const id = useParams()
    
    const setRead = async() =>{
      try {
        await setReadNotification(id._id);
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
        getUserNotificationbyId(id._id);
        setRead();
    }, []);
      
  return (
    <>
        <SideBar/>
        {notification && user?.role === "admin" && notification.title === "New Driver Signup"
        && <ApproveDriverPage/>
        }
        {notification && user?.role === "driver" && notification.title === "new Ride booked"
        && <DriverRideRequest/>
        }
    </>
    
  );
}
export default NotificationDetails;
