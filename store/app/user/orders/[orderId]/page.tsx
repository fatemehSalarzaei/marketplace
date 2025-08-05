"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrderDetail } from "@/services/order/getOrderDetail";
import OrderDetailsBody from "@/components/OrderDetails/OrderDetailsBody";
import { OrderDetail } from "@/types/order/orderDetails";

export default function OrderPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;

    const fetchData = async () => {
      try {
        const result = await getOrderDetail(orderId);
        setOrder(result);
      } catch (err) {
        setError("خطا در دریافت اطلاعات سفارش");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!order) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <OrderDetailsBody order={order} />
    </div>
  );
}
