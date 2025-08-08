"use client";

import { Notification } from "@/types/notification/notification";

const channelMap: Record<string, string> = {
  site: "درون سایت",
  email: "ایمیل",
  sms: "پیامک",
};

const typeMap: Record<string, string> = {
  order_status: "وضعیت سفارش",
  discount: "تخفیف",
  review_reply: "پاسخ به نظر",
  custom: "سفارشی",
};

interface Props {
  notification: Notification;
  onClose: () => void;
}

export default function NotificationDetailDialog({ notification, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      // حذف بک‌گراند سیاه، فقط خود دیالوگ هست
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4"
        onClick={(e) => e.stopPropagation()} // جلوگیری از بستن دیالوگ با کلیک داخل آن
        style={{ borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">{notification.title}</h2>
        <p className="mb-4 text-gray-700 whitespace-pre-wrap">{notification.message}</p>
{/* 
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-semibold">نوع اعلان:</span>{" "}
            {typeMap[notification.type ?? ""] || "نامشخص"}
          </p>
          <p>
            <span className="font-semibold">کانال اعلان:</span>{" "}
            {channelMap[notification.channel ?? ""] || "نامشخص"}
          </p>
          <p>
            <span className="font-semibold">وضعیت:</span>{" "}
            {notification.is_read ? "خوانده شده" : "خوانده نشده"}
          </p>
          <p className="text-xs text-gray-400">
            <span className="font-semibold">تاریخ:</span>{" "}
            {new Date(notification.created_at).toLocaleString("fa-IR")}
          </p>
        </div> */}

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
