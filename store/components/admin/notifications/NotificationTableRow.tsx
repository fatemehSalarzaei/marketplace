import React from 'react';
import { Notification } from '@/types/admin/notification/notification';
import Link from 'next/link';

interface Props {
  notification: Notification;
  onMarkRead: (id: number) => void;
}

export default function NotificationTableRow({ notification }: Props) {
  return (
    <tr className="bg-white border border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-2">{notification.title}</td>
      <td className="px-4 py-2">
        {notification.user?.first_name} {notification.user?.last_name}
      </td>
      <td className="px-4 py-2">
        {notification.channel === 'site'
          ? 'درون سایت'
          : notification.channel === 'email'
          ? 'ایمیل'
          : 'پیامک'}
      </td>
      <td className="px-4 py-2">
        {notification.type === 'order_status'
          ? 'وضعیت سفارش'
          : notification.type === 'discount'
          ? 'تخفیف'
          : notification.type === 'review_reply'
          ? 'پاسخ به نظر'
          : 'سفارشی'}
      </td>
      <td className="px-4 py-2">
        {new Date(notification.created_at).toLocaleDateString('fa-IR')}
      </td>
      <td className="px-4 py-2 text-sm">
        {notification.is_read ? (
          <span className="text-green-600 font-medium">خوانده شده</span>
        ) : (
          <span className="text-red-600 font-medium">خوانده نشده</span>
        )}
      </td>
      <td className="px-4 py-2">
        <Link
          href={`/admin/notifications/${notification.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          مشاهده
        </Link>
      </td>
    </tr>
  );
}
