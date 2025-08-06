'use client';

import React from 'react';
import { format } from 'date-fns-jalali';
import { Order } from '@/types/admin/orders/orders';

interface Props {
  statusHistory: Order['status_history'];
}

const statusMap: Record<string, string> = {
  pending: 'در انتظار پرداخت',
  paid: 'پرداخت‌شده',
  processing: 'در حال پردازش',
  shipped: 'ارسال‌شده',
  delivered: 'تحویل داده شده',
  canceled: 'لغو شده',
};

const OrderStatusHistory: React.FC<Props> = ({ statusHistory }) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 shadow-sm mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">تاریخچه وضعیت سفارش</h2>

      <div className="space-y-3 text-sm text-gray-700">
        {statusHistory.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-200 pb-2 last:border-none last:pb-0"
          >
            <span className="font-medium">{statusMap[entry.status] || entry.status}</span>
            <span className="text-gray-500">
              {format(new Date(entry.changed_at), 'yyyy/MM/dd HH:mm')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusHistory;
