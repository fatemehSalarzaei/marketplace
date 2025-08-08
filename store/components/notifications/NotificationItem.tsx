"use client";

import React from "react";
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
  onMarkRead: (id: number) => void;
  onViewDetails: (id: number) => void;
}

export default function NotificationItem({ notification, onMarkRead, onViewDetails }: Props) {
  // استفاده از typeMap برای نوع اعلان
  const notificationType = typeMap[notification.type ?? ""] || "نامشخص";
  // استفاده از channelMap برای کانال اعلان (اگر موجود باشد)
  const notificationChannel = channelMap[notification.channel ?? ""] || "نامشخص";

  return (
    <div
      className={`p-4 mb-2 rounded-lg shadow-md flex flex-col md:flex-row md:items-center justify-between
        ${notification.is_read ? "bg-gray-100" : "bg-white"}`}
      style={{ cursor: "default" }} // حذف کلیک روی کل کارت
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

        <span className="text-xs text-gray-500 whitespace-nowrap">
          کانال: {notificationChannel}
        </span>

        <span className="text-xs text-gray-400 whitespace-nowrap">
          {new Date(notification.created_at).toLocaleString("fa-IR")}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!notification.is_read) onMarkRead(notification.id);
          onViewDetails(notification.id);
        }}
        className="mt-2 md:mt-0 px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
      >
        مشاهده جزئیات
      </button>
    </div>
  );
}
