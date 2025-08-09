// components/dashboard/OrdersSection.tsx
"use client";

import React from "react";
import { OrdersSummary } from "@/types/dashboard/dashboard";

export default function OrdersSection({ ordersSummary }: { ordersSummary: OrdersSummary }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold mb-3">خلاصه سفارش‌ها</h3>
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-gray-50 rounded text-center">
          <div className="text-2xl font-bold text-blue-600">{ordersSummary.processing}</div>
          <div className="text-sm text-gray-600">در حال پردازش</div>
        </div>
        <div className="p-3 bg-gray-50 rounded text-center">
          <div className="text-2xl font-bold text-green-600">{ordersSummary.delivered}</div>
          <div className="text-sm text-gray-600">تحویل شده</div>
        </div>
        <div className="p-3 bg-gray-50 rounded text-center">
          <div className="text-2xl font-bold text-red-600">{ordersSummary.returned}</div>
          <div className="text-sm text-gray-600">درخواست برگشت</div>
        </div>
      </div>
    </div>
  );
}
