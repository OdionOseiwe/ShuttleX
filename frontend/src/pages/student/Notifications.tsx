import SideBar from "../../layout/SideBar";
import NotificationList from "../../components/NotificationList";

type driverNotificationsType = {
  id: number;
  title: string;
  time: string;
  read: boolean;
};
function Notifications() {
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
      <NotificationList notifications={driverNotifications} />
    </div>
  );
}

export default Notifications;
