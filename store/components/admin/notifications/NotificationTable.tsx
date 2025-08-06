'use client';

import React from 'react';
import { Notification } from '@/types/admin/notification/notification';
import NotificationTableRow from './NotificationTableRow';

interface Props {
  notifications: Notification[];
  page: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onMarkRead: (id: number) => void;
}

export default function NotificationTable({
  notifications,
  page,
  totalCount,
  onPageChange,
  onMarkRead,
}: Props) {
  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-separate border-spacing-y-2">
        <thead className="bg-gray-100">
          <tr className="text-gray-700 text-sm">
            <th className="px-4 py-2">عنوان</th>
            <th className="px-4 py-2">گیرنده</th>
            <th className="px-4 py-2">کانال</th>
            <th className="px-4 py-2">نوع</th>
            <th className="px-4 py-2">تاریخ</th>
            <th className="px-4 py-2">وضعیت</th>
            <th className="px-4 py-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notif) => (
            <NotificationTableRow
              key={notif.id}
              notification={notif}
              onMarkRead={onMarkRead}
            />
          ))}
        </tbody>
      </table>

      {/* صفحه‌بندی */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`mx-1 px-3 py-1 rounded border ${
              page === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
