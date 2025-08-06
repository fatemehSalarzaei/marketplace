import React from 'react';
import NotificationsContainer from '@/components/admin/notifications/NotificationsContainer';
export default function AdminNotificationsPage() {
  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      {/* <h1 className="text-3xl font-bold mb-6 text-center">لیست اعلان‌ها</h1> */}
      <NotificationsContainer />
    </main>
  );
}
