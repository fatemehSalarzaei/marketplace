'use client';

import React, { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend,
} from "recharts";

const COLORS = ["#22c55e", "#f87171", "#3b82f6", "#fbbf24"];

const revenueData = {
  total: 125000000,
  cash: 70000000,
  credit: 55000000,
};

const paymentMethodsData = [
  { method: "کارت به کارت", count: 540, successRate: 0.95 },
  { method: "درگاه اینترنتی", count: 780, successRate: 0.9 },
  { method: "پرداخت در محل", count: 210, successRate: 0.98 },
];

const orderStatusData = [
  { status: "ارسال شده", count: 430 },
  { status: "در حال ارسال", count: 120 },
  { status: "تحویل شده", count: 1000 },
  { status: "مرجوع شده", count: 75 },
];

export default function FinanceLogisticsReport() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-6">گزارشات مالی و لجستیک</h1>

      {/* درآمد کل و تفکیک نقدی/اعتباری */}
      <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <p className="text-gray-600 mb-2">درآمد کل</p>
          <p className="text-3xl font-bold text-green-600">{revenueData.total.toLocaleString()} تومان</p>
        </div>
        <div className="flex-1 grid grid-cols-1 gap-3">
          <div className="bg-green-100 p-3 rounded text-green-800 font-semibold">
            نقدی: {revenueData.cash.toLocaleString()} تومان
          </div>
          <div className="bg-blue-100 p-3 rounded text-blue-800 font-semibold">
            اعتباری: {revenueData.credit.toLocaleString()} تومان
          </div>
        </div>
      </div>

      {/* روش‌های پرداخت محبوب و نرخ موفقیت */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">روش‌های پرداخت و نرخ موفقیت تراکنش‌ها</h2>
        <table className="w-full text-right table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">روش پرداخت</th>
              <th className="border border-gray-300 px-4 py-2">تعداد تراکنش‌ها</th>
              <th className="border border-gray-300 px-4 py-2">نرخ موفقیت</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethodsData.map((item) => (
              <tr key={item.method}>
                <td className="border border-gray-300 px-4 py-2">{item.method}</td>
                <td className="border border-gray-300 px-4 py-2">{item.count}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {(item.successRate * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* وضعیت سفارش‌ها */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">وضعیت سفارش‌ها در لجستیک</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={orderStatusData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            onClick={(e) => setSelectedStatus(e.activeLabel || null)}
          >
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>

        {selectedStatus && (
          <p className="mt-4 text-center text-gray-700">
            تعداد سفارش‌ها در وضعیت <span className="font-semibold">{selectedStatus}</span> :{" "}
            {
              orderStatusData.find((item) => item.status === selectedStatus)?.count || 0
            }
          </p>
        )}
      </div>
    </div>
  );
}
