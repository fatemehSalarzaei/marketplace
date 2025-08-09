// components/dashboard/FrequentPurchases.tsx
"use client";

import React from "react";

export type FrequentPurchase = { id?: number; name: string; count: number };

export default function FrequentPurchases({ items }: { items: FrequentPurchase[] }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">خریدهای پرتکرار</h3>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">مورد پرتکراری ثبت نشده است.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((it, idx) => (
            <li key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>{it.name}</span>
              <span className="text-sm text-gray-600">{it.count} بار</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
