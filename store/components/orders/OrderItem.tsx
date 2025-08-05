"use client";

import { Order } from "@/types/order/orders";
import { ORDER_STATUS_LABELS } from "@/constants/orderStatus";
import { format } from "date-fns-jalali";
import Link from "next/link";

export default function OrderItem({ order }: { order: Order }) {
  return (
    <div
      className="
        relative
        border-2 border-blue-400
        rounded-xl
        shadow-lg
        bg-white
        space-y-3
        p-6
        font-iranyekan
        hover:border-blue-600
        hover:shadow-xl
        transition-all duration-300
        m-4
        min-h-[130px]
      "
    >
      {/* دکمه جزئیات و مبالغ در بالا سمت چپ */}
      <div className="flex flex-col gap-2 sm:absolute sm:top-4 sm:left-4 sm:mb-0">
        <Link
          href={`/user/orders/${order.id}`}
          className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition"
        >
          جزئیات
        </Link>
        <p className="text-sm text-gray-700 mt-2">
          ارسال: {Number(order.delivery_price).toLocaleString()} ت
        </p>
        <p className="text-sm text-gray-700">
          مجموع: {Number(order.total_price).toLocaleString()} ت
        </p>
      </div>

      {/* اطلاعات سفارش در سمت راست */}
      <div className="grid grid-cols-2 gap-4  text-sm text-gray-700">
        <div>
          <span className="font-medium">شماره سفارش: </span>#
          {order.order_number}
        </div>
        <div>
          <span className="font-medium">تاریخ: </span>
          {format(new Date(order.created_at), "yyyy/MM/dd")}
        </div>
        <div>
          <span className="font-medium">وضعیت: </span>
          {ORDER_STATUS_LABELS[order.status]}
        </div>
        <div>
          <span className="font-medium">پرداخت شده: </span>
          {order.is_paid ? "بله" : "خیر"}
        </div>
      </div>
    </div>
  );
}
