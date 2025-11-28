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

    console.log(notification);
    
    useEffect(() => {
        getUserNotificationbyId(id._id);
        setRead();
    }, []);
      
  return (
    <>
        <SideBar/>
        {notification && user?.user?.role === "admin"
        && <ApproveDriverPage 
          driver={{
                  id:notification.data.userId,
                  nin: notification.data.nin,
                  vehicleNumber: notification.data.vehicleNumber,
                  vehicleType: notification.data.vehicleType,
                  email: notification.data.email,
                  name: notification.data.user,
                  mobileNumber: notification.data.mobileNumber,
            }}

        />
        }
        {notification && user?.user?.role === "driver" 
        && <DriverRideRequest/>
        }
    </>
    
  );
}
export default NotificationDetails;
