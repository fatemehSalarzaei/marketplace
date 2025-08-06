'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { fetchAdminNotifications } from '@/services/admin/notifications/notificationsService';
import { Notification } from '@/types/admin/notification/notification';
import NotificationTable from './NotificationTable';
import NotificationFilters from './NotificationFilters';
import { useRouter } from 'next/navigation';

export default function NotificationsContainer() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({ is_read: '', type: '', channel: '', search: '' });
  const router = useRouter();

  useEffect(() => {
    async function loadNotifications() {
      setLoading(true);
      try {
        const data = await fetchAdminNotifications({ page, ...filters });
        setNotifications(data.results);
        setCount(data.count);
        setError(null);
      } catch {
        setError('خطا در بارگذاری اعلان‌ها');
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, [page, filters]);

  const handleMarkRead = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, is_read: true } : notif))
    );
    // اینجا می‌توانید درخواست API برای علامت خوانده شده ارسال کنید
  }, []);

  const handleFilterChange = useCallback((key: string, value: string) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleFilterReset = useCallback(() => {
    setPage(1);
    setFilters({ is_read: '', type: '', channel: '', search: '' });
  }, []);

  const handleAddNotification = useCallback(() => {
    router.push('/admin/notifications/create');
  }, [router]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-600">
        در حال بارگذاری اعلان‌ها...
      </p>
    );
  }

  if (error) {
    return <p className="text-center mt-20 text-red-600">{error}</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">لیست اعلان‌ها</h1>
        <button
          onClick={handleAddNotification}
          className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + افزودن اعلان
        </button>
      </div>

      <NotificationFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleFilterReset}
      />

      <NotificationTable
        notifications={notifications}
        page={page}
        totalCount={count}
        onPageChange={setPage}
        onMarkRead={handleMarkRead}
      />
    </div>
  );
}
