"use client";

import React from "react";
import { OrderItem } from "@/types/admin/orders/orders";

interface Props {
  item: OrderItem;
}

const OrderItemRow: React.FC<Props> = ({ item }) => {
  return (
    <tr>
      <td className="border border-gray-300 px-2 py-1">{item.title_snapshot}</td>
      <td className="border border-gray-300 px-2 py-1">{item.variant ?? "—"}</td>
      <td className="border border-gray-300 px-2 py-1">{item.quantity}</td>
      <td className="border border-gray-300 px-2 py-1">{item.unit_price}</td>
      <td className="border border-gray-300 px-2 py-1">{item.total_price}</td>
      <td className="border border-gray-300 px-2 py-1">
        {item.is_returnable ? "قابل برگشت" : "غیر قابل برگشت"}
      </td>
      <td className="border border-gray-300 px-2 py-1">{item.returned_quantity}</td>
    </tr>
  );
};

export default OrderItemRow;
