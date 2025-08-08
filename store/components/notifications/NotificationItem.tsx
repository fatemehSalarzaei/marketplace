"use client";

import { Notification } from "@/types/notification/notification";

interface Props {
  notification: Notification;
  onMarkRead: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const notificationTypeMap: Record<string, string> = {
  info: "اطلاع‌رسانی",
  warning: "هشدار",
  error: "خطا",
  success: "موفقیت",
};

export default function NotificationItem({ notification, onMarkRead, onViewDetails }: Props) {
  const notificationType = notificationTypeMap[notification.type ?? ""] || "نامشخص";

  return (
    <div
      className={`p-4 mb-2 rounded-lg shadow-md flex flex-col md:flex-row md:items-center justify-between
        ${notification.is_read ? "bg-gray-100" : "bg-white"}`}
      onClick={() => {
        if (!notification.is_read) onMarkRead(notification.id);
      }}
      style={{ cursor: notification.is_read ? "default" : "pointer" }}
    >
      <div className="flex flex-col space-y-1 md:flex-row md:space-x-4 md:space-y-0 md:items-center flex-1">
        <h4 className="font-semibold">{notification.title}</h4>

        <span
          className={`text-xs font-semibold px-2 py-1 rounded
          ${notification.is_read ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
        >
          {notification.is_read ? "خوانده شده" : "خوانده نشده"}
        </span>

        <span className="text-xs text-gray-500 whitespace-nowrap">
          نوع اعلان: {notificationType}
        </span>

        <span className="text-xs text-gray-400 whitespace-nowrap">
          {new Date(notification.created_at).toLocaleString("fa-IR")}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails(notification.id);
        }}
        className="mt-2 md:mt-0 px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
      >
        مشاهده جزئیات
      </button>
    </div>
  );
}
