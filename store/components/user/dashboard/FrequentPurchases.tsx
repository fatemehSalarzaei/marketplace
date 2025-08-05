"use client";

import React from "react";

export interface FrequentPurchase {
  id: number;
  name: string;
  count: number;
}

interface FrequentPurchasesProps {
  items: FrequentPurchase[];
}

export default function FrequentPurchases({ items }: FrequentPurchasesProps) {
  return (
    <section className="bg-white p-4 sm:p-5 rounded-md shadow">
      <h2 className="text-black text-lg sm:text-xl font-semibold mb-4">
        پرتکرارترین خریدها
      </h2>
      {items.length === 0 ? (
        <p className="text-neutral-500 text-sm">
          هیچ خرید پرتکراری وجود ندارد.
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map(({ id, name, count }) => (
            <li
              key={id}
              className="flex justify-between items-center border-b border-gray-200 pb-2 text-sm"
            >
              <span className="text-neutral-700">{name}</span>
              <span className="text-neutral-500">تعداد: {count}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
