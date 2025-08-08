"use client";

import { useState, useEffect } from "react";
import { notificationService } from "@/services/notification/notificationService";
import { Notification } from "@/types/notification/notification";
import NotificationItem from "./NotificationItem";
import NotificationDetailDialog from "./NotificationDetailDialog";
import Pagination from "./Pagination";

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(10);

  // State برای باز بودن دیالوگ و اعلان انتخاب شده
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchNotifications(page);
  }, [page]);

  async function fetchNotifications(page: number) {
    try {
      const data = await notificationService.getNotifications(page);
      setNotifications(data.results);
      setTotalCount(data.count);
    } catch (error) {
      console.error("خطا در دریافت اعلان‌ها:", error);
    }
  }

  async function handleMarkRead(id: number) {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      console.error("خطا در علامت‌گذاری خوانده شده:", error);
    }
  }

  // تابع باز کردن دیالوگ جزئیات و علامت خوانده شده
  const handleViewDetails = async (id: number) => {
    const notif = notifications.find((n) => n.id === id);
    if (!notif) return;

    if (!notif.is_read) {
      await handleMarkRead(id);
    }
    setSelectedNotification(notif);
    setIsDialogOpen(true);
  };

  // بستن دیالوگ
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedNotification(null);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">لیست اعلان‌ها</h2>

      {notifications.length === 0 ? (
        <p>اعلانی برای نمایش وجود ندارد.</p>
      ) : (
        <>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={handleMarkRead}
              onViewDetails={handleViewDetails} // اضافه شده اینجا
            />
          ))}

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

          {isDialogOpen && selectedNotification && (
            <NotificationDetailDialog
              notification={selectedNotification}
              onClose={closeDialog}
            />
          )}
        </>
      )}
    </div>
  );
}
