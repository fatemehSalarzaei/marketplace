"use client";

import React, { useState, useEffect } from "react";
import OrdersSection, { OrdersSummary } from "./OrdersSection";
import ListsSection, { ListItem } from "./ListsSection";
import FrequentPurchases, { FrequentPurchase } from "./FrequentPurchases";
import { Menu, X } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<{ fullName: string; phone: string }>({
    fullName: "",
    phone: "",
  });
  const [ordersSummary, setOrdersSummary] = useState<OrdersSummary>({
    processing: 0,
    delivered: 0,
    returned: 0,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sampleLists: ListItem[] = [
    { id: 1, title: "لیست خرید لوازم خانگی" },
    { id: 2, title: "لیست کتاب‌های مورد علاقه" },
  ];
  const sampleFrequentPurchases: FrequentPurchase[] = [
    { id: 1, name: "کفش اسپرت", count: 5 },
    { id: 2, name: "هدفون بی‌سیم", count: 3 },
  ];

  useEffect(() => {
    const fullName = localStorage.getItem("full_name") || "";
    const phone = localStorage.getItem("phone_numbers") || "";
    setUser({ fullName, phone });
    setOrdersSummary({ processing: 2, delivered: 10, returned: 1 });
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* دکمه منوی موبایل */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow z-40 sticky top-0">
        <button onClick={() => setSidebarOpen(true)} className="ml-auto">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* سایدبار موبایل */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
          <div className="bg-white w-64 h-full shadow-lg overflow-y-auto relative">
            <button
              className="absolute left-3 top-3 text-gray-600 hover:text-red-600"
              onClick={() => setSidebarOpen(false)}
              aria-label="بستن منو"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* محتوای اصلی */}
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        <h1 className="text-xl font-bold">
          خوش آمدید {user.fullName || user.phone}
        </h1>
        <OrdersSection ordersSummary={ordersSummary} />
        <ListsSection lists={sampleLists} />
        <FrequentPurchases items={sampleFrequentPurchases} />
      </main>
    </div>
  );
}
