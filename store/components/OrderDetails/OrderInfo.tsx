"use client";

import { ORDER_STATUS_LABELS } from "@/constants/orderStatus";

export default function OrderInfo({ order }: { order: any }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">اطلاعات سفارش</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p>
          کد سفارش: <span className="font-medium">{order.order_number}</span>
        </p>
        <p>
          وضعیت:{" "}
          <span className="font-medium">
            {ORDER_STATUS_LABELS[order.status] || order.status}
          </span>
        </p>
        <p>
          مبلغ کل:{" "}
          <span className="font-medium">
            {order.final_price.toLocaleString()} تومان
          </span>
        </p>
        <p>
          تاریخ ثبت سفارش:{" "}
          <span className="font-medium">
            {new Date(order.created_at).toLocaleString("fa-IR")}
          </span>
        </p>
        <p>
          پرداخت شده:{" "}
          <span className="font-medium">{order.is_paid ? "بله" : "خیر"}</span>
        </p>
      </div>
    </div>
  );
}
