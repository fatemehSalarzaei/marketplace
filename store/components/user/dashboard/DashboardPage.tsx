// components/dashboard/DashboardPanel.tsx
"use client";

import React from "react";
import OrdersSection from "./OrdersSection";
import ListsSection from "./ListsSection";
import FrequentPurchases from "./FrequentPurchases";
import { DashboardPayload } from "@/types/dashboard/dashboard";

export default function DashboardPanel({ data }: { data: DashboardPayload }) {
  const sampleLists = data.profile ? [{ id: 1, title: "لیست خرید من" }] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">خوش آمدید {data.profile?.fullName || data.profile?.phone || "کاربر"}</h1>
          <p className="text-sm text-gray-500 mt-1">داشبورد شما</p>
        </div>
      </div>

      <OrdersSection ordersSummary={data.ordersSummary} />

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
        {/* <ListsSection lists={sampleLists} /> */}
        <FrequentPurchases items={data.frequentPurchases.map(fp => ({ name: fp.product_name, count: fp.count }))} />
      {/* </div> */}

      <div>
        <h3 className="text-lg font-semibold mb-2">علاقه‌مندی‌ها</h3>
        {data.favorites.length === 0 ? (
          <p className="text-gray-500">هنوز محصولی ذخیره نشده است.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.favorites.map((f) => (
              <li key={f.id} className="p-3 bg-white rounded shadow-sm flex items-center gap-3">
                {f.main_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={f.main_image_url} alt={f.product_name || ""} className="w-30 h-30 object-cover rounded" />
                ) : (
                  <div className="w-30 h-30 bg-gray-100 rounded" />
                )}
                <div>
                  <div className="font-medium">{f.product_name}</div>
                  <div className="text-xs text-gray-500">ذخیره شده در: {new Date(f.created_at || "").toLocaleString("fa-IR")}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
