import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

type driverNotificationsType = {
  id: number;
  title: string;
  time: string;
  read: boolean;
};

type NotificationListProps = {
  notifications: driverNotificationsType[];
  onDelete?: (id: number) => void; // optional callback
};

function NotificationList({ notifications, onDelete }: NotificationListProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full md:w-3/4 mx-auto p-4 md:px-20 px-10">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="group relative flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="font-semibold text-gray-800">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">{item.time}</p>
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
                onClick={() => navigate(`/notifications/${item.id}`)}
                className="px-4 py-2 rounded-md bg-[#1f2d3d] text-white hover:bg-[#16222d] transition"
              >
                Details
              </button>
              <Trash2
                size={20}
                color="black"
                className="text-gray-500 cursor-pointer hidden group-hover:block "
                onClick={() => onDelete && onDelete(item.id)}
              />
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationList;
