import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useNotificationStore } from "../store/useNotification";
import { useEffect } from "react";

function NotificationList() {
  const navigate = useNavigate();
  const {getNoficationsForUser,NotificationsArray} = useNotificationStore()
  useEffect(() => {
    getNoficationsForUser();
  }, []);  

  return (
    <div className="w-full md:w-3/4 mx-auto p-4 md:px-20 px-5">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      <div className="space-y-3">
        {NotificationsArray?.map((item) => (
          <div
            className="group relative flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="font-semibold text-gray-800">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">{new Date(item?.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <p
                className={`text-sm font-semibold ${
                  item.read ? "text-gray-400" : "text-purple-600"
                }`}
              >
                {item.read ? "Read" : "Unread"}
              </p>
              

              <button
                disabled ={item.title !== "New Driver Signup" && item.title !== "new Ride booked"}
                onClick={() => navigate(`detail/${item._id}`)}
                className="px-4 py-2 rounded-md bg-[#1f2d3d] text-white hover:bg-[#16222d] transition"
              >
                Details
              </button>
              {}
              <Trash2
                size={20}
                color="black"
                className="text-gray-500 cursor-pointer hidden group-hover:block "
                // onClick={() => onDelete && onDelete(item.id)}
              />
            </div>

            
          </div>
        ))}
        {!NotificationsArray && <div className="text-2xl text-center">
          no notifications yet
          </div>}
      </div>
    </div>
  );
}

export default NotificationList;
