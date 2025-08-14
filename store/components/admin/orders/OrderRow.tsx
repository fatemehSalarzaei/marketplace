"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Order } from "@/types/admin/orders/orders";
import OrderItemRow from "./OrderItemRow";
import { useAuth } from "@/context/AuthContext";

interface Props {
  order: Order;
}

const OrderRow: React.FC<Props> = ({ order }) => {
  const [showItems, setShowItems] = useState(false);
  const router = useRouter();
  const { hasPermission } = useAuth();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasPermission("order", "update")) {
      router.push(`/admin/orders/edit/${order.id}`);
    }
  };

  const getPersianStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "در انتظار تأیید";
      case "processing":
        return "در حال پردازش";
      case "shipped":
        return "ارسال شده";
      case "delivered":
        return "تحویل داده شده";
      case "cancelled":
        return "لغو شده";
      case "returned":
        return "مرجوع شده";
      case "failed":
        return "ناموفق";
      default:
        return "نامشخص";
    }
  };

  return (
    <>
      <tr
        onClick={() => setShowItems(!showItems)}
        style={{ cursor: "pointer" }}
        className="hover:bg-gray-100"
      >
        <td className="border border-gray-300 px-4 py-2">{order.order_number}</td>
        <td className="border border-gray-300 px-4 py-2">
          {order.user.first_name} {order.user.last_name}
        </td>
        <td className="border border-gray-300 px-4 py-2">{getPersianStatus(order.status)}</td>
        <td className="border border-gray-300 px-4 py-2">{order.final_price}</td>
        <td className="border border-gray-300 px-4 py-2">
          {new Date(order.created_at).toLocaleDateString("fa-IR")}
        </td>
        {hasPermission("order", "update") && (
          <td className="border border-gray-300 px-4 py-2 text-center">
            <button
              onClick={handleEdit}
              className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              ویرایش
            </button>
          </td>
        )}
      </tr>

      {showItems && (
        <tr>
          <td colSpan={hasPermission("order", "update") ? 6 : 5} className="p-2 bg-gray-50">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-2 py-1">عنوان آیتم</th>
                  <th className="border border-gray-300 px-2 py-1">متغیر</th>
                  <th className="border border-gray-300 px-2 py-1">تعداد</th>
                  <th className="border border-gray-300 px-2 py-1">قیمت واحد</th>
                  <th className="border border-gray-300 px-2 py-1">قیمت کل</th>
                  <th className="border border-gray-300 px-2 py-1">قابل برگشت</th>
                  <th className="border border-gray-300 px-2 py-1">تعداد برگشتی</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <OrderItemRow key={item.title_snapshot + item.variant} item={item} />
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

export default OrderRow;
