"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import ReturnRequestForm from "./ReturnRequestForm";

type OrderActionsProps = {
  orderId: string;
  orderItems: any[];
  orderStatus: string; // اضافه کردن وضعیت سفارش به پراپس‌ها
};

export default function OrderActions({
  orderId,
  orderItems,
  orderStatus,
}: OrderActionsProps) {
  const router = useRouter();
  const [showReturnForm, setShowReturnForm] = useState(false);

  // وقتی روی لغو سفارش کلیک شد، فرم باز شود
  const handleCancelOrder = () => {
    setShowReturnForm(true);
  };

  const handleViewInvoice = () => {
    router.push(`/user/orders/${orderId}/invoice`);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ردیف دکمه‌ها و بازگشت */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        {/* سمت راست: بازگشت */}
        <div
          className="flex items-center gap-2 text-blue-600 cursor-pointer"
          onClick={() => router.push("/user/orders")}
        >
          <ArrowRightIcon className="w-5 h-5" />
          <span className="text-sm font-medium">جزئیات سفارش</span>
        </div>

        {/* سمت چپ: دکمه‌ها */}
        <div className="flex gap-3">
          {/* نمایش دکمه لغو فقط وقتی وضعیت تحویل داده شده باشد */}
          {orderStatus === "delivered" && (
            <button
              onClick={handleCancelOrder}
              className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              لغو سفارش
            </button>
          )}
          <button
            onClick={handleViewInvoice}
            className="px-4 py-2 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
          >
            مشاهده فاکتور
          </button>
        </div>
      </div>

      {/* فرم درخواست برگشت سفارش */}
      {showReturnForm && (
        <div className="mt-4 p-4 border rounded bg-gray-50 shadow-sm">
          <ReturnRequestForm
            orderId={Number(orderId)}
            orderItems={orderItems}
            onClose={() => setShowReturnForm(false)}
          />
        </div>
      )}
    </div>
  );
}
