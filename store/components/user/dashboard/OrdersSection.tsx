"use client";

import React from "react";

export interface OrdersSummary {
  processing: number;
  delivered: number;
  returned: number;
}

const orderStatuses = [
  { key: "processing", label: "جاری", color: "text-blue-600" },
  { key: "delivered", label: "تحویل داده شده", color: "text-green-600" },
  { key: "returned", label: "مرجوعی", color: "text-red-600" },
] as const;

type StatusKey = (typeof orderStatuses)[number]["key"];

interface OrdersSectionProps {
  ordersSummary: OrdersSummary;
}

export default function OrdersSection({ ordersSummary }: OrdersSectionProps) {
  return (
    <section className="bg-white p-4 sm:p-5 rounded-md shadow">
      <h2 className="text-black text-lg sm:text-xl font-semibold mb-4">
        سفارش‌های من
      </h2>
      <ul className="flex flex-wrap gap-4">
        {orderStatuses.map(({ key, label, color }) => (
          <li
            key={key}
            className="flex flex-col items-center border border-gray-200 rounded-md p-4 w-24 sm:w-28"
          >
            <span className={`text-xl sm:text-2xl font-bold ${color}`}>
              {ordersSummary[key as StatusKey] ?? 0}
            </span>
            <span className="text-black mt-2 text-sm text-center">{label}</span>
          </li>
        ))}
      </ul>
      <a
        href="/user/orders/"
        className="mt-4 inline-block text-blue-600 hover:underline text-sm"
      >
        مشاهده همه سفارش‌ها
      </a>
    </section>
  );
}
