"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Order } from "@/types/order/orders";
import { getMyOrders } from "@/services/order/getMyOrders";
import OrderItem from "./OrderItem";
import { ORDER_STATUS_LABELS } from "@/constants/orderStatus";

const STATUSES = [
  "all",
  "pending",
  "processing",
  "shipped",
  "delivered",
  "canceled",
];

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetch = useCallback(async () => {
    const status = statusFilter === "all" ? undefined : statusFilter;
    const data = await getMyOrders(page, status);
    setNextUrl(data.next);
    setOrders((prev) =>
      page === 1 ? data.results : [...prev, ...data.results]
    );
  }, [page, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextUrl) setPage((p) => p + 1);
      },
      { threshold: 1 }
    );
    if (loaderRef.current) obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [nextUrl]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">سفارش‌های من</h1>
      <div className="mb-4">
        <label className="ml-2 font-medium">فیلتر وضعیت:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {ORDER_STATUS_LABELS[s] || s}
            </option>
          ))}
        </select>
      </div>
      {orders.map((o) => (
        <OrderItem key={o.id} order={o} />
      ))}
      <div ref={loaderRef} className="h-6 text-center text-gray-500">
        {nextUrl && "در حال دریافت موارد بیشتر..."}
      </div>
    </div>
  );
}
