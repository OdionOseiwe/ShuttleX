import { FC, useEffect } from "react";

interface NotificationProps {
  open: boolean;
  onClose: () => void;
  message: string;
  onRedirect?: string;
  duration?: number; // in ms, default 60000 (1 min)
}

const Notification: FC<NotificationProps> = ({
  open,
  onClose,
  message,
  onRedirect,
  duration = 60000,
}) => {
  // Auto-close after duration
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className="fixed top-4 right-4 w-72 bg-white border border-gray-300 shadow-lg rounded-xl p-4 flex flex-col space-y-2 z-50">
      <div className="flex justify-between items-start">
        <p className="text-gray-800 text-sm">{message}</p>
        <button
          className="text-gray-500 hover:text-gray-700 font-bold"
          onClick={onClose}
        >
          ×
        </button>
      </div>
        <a className="mt-2  px-3 py-1 text-center bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700" onClick={onClose} href={onRedirect}>
          Go
        </a >
       
    </div>
  );
};

export default Notification;
