'use client';

import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const salesData = [
  { period: "دیروز", sales: 1200000 },
  { period: "هفته گذشته", sales: 8500000 },
  { period: "ماه گذشته", sales: 34000000 },
  { period: "سال گذشته", sales: 400000000 },
];

const dailySalesData = [
  { date: "2025-08-01", sales: 500000 },
  { date: "2025-08-02", sales: 700000 },
  { date: "2025-08-03", sales: 400000 },
  { date: "2025-08-04", sales: 900000 },
  { date: "2025-08-05", sales: 1200000 },
  { date: "2025-08-06", sales: 800000 },
];

const topProducts = [
  { name: "کفش ورزشی", salesCount: 120, revenue: 24000000 },
  { name: "کت تک مردانه", salesCount: 85, revenue: 17000000 },
  { name: "کوله پشتی", salesCount: 60, revenue: 9000000 },
];

const lowStockProducts = [
  { name: "پیراهن زنانه", stock: 3 },
  { name: "کفش صندل", stock: 2 },
  { name: "عینک آفتابی", stock: 1 },
];

export default function SalesProductsReport() {
  const [selectedPeriod, setSelectedPeriod] = useState("ماه گذشته");
  const [useCustomRange, setUseCustomRange] = useState(false);
  const [customFromDate, setCustomFromDate] = useState("");
  const [customToDate, setCustomToDate] = useState("");
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    if (useCustomRange && customFromDate && customToDate) {
      // مجموع فروش در بازه دلخواه
      const filtered = dailySalesData.filter(
        (d) => d.date >= customFromDate && d.date <= customToDate
      );
      const sum = filtered.reduce((acc, cur) => acc + cur.sales, 0);
      setTotalSales(sum);
    } else {
      // مجموع فروش بازه پیش‌فرض
      const found = salesData.find((d) => d.period === selectedPeriod);
      setTotalSales(found?.sales || 0);
    }
  }, [selectedPeriod, useCustomRange, customFromDate, customToDate]);

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-4">گزارشات فروش و محصولات</h1>

      {/* انتخاب بازه زمانی */}
      <div className="mb-6 space-y-3">
        <label className="block font-semibold">نوع بازه زمانی:</label>
        <div className="flex items-center gap-4">
          <select
            disabled={useCustomRange}
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="border border-gray-300 rounded px-3 py-2"
          >
            {salesData.map((item) => (
              <option key={item.period} value={item.period}>
                {item.period}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useCustomRange}
              onChange={() => setUseCustomRange((prev) => !prev)}
            />
            بازه دلخواه
          </label>
        </div>

        {useCustomRange && (
          <div className="flex items-center gap-4">
            <div>
              <label className="block mb-1 font-semibold">از تاریخ:</label>
              <input
                type="date"
                value={customFromDate}
                onChange={(e) => setCustomFromDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">تا تاریخ:</label>
              <input
                type="date"
                value={customToDate}
                onChange={(e) => setCustomToDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
        )}
      </div>

      {/* کارت مجموع فروش */}
      <div className="bg-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <p className="text-gray-500">
            مجموع فروش در{" "}
            {useCustomRange
              ? `${customFromDate || "شروع"} تا ${customToDate || "پایان"}`
              : selectedPeriod}
            :
          </p>
          <p className="text-3xl font-bold text-green-600">
            {totalSales.toLocaleString()} تومان
          </p>
        </div>
      </div>

      {/* نمودار فروش */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">روند فروش (تومان)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={
              useCustomRange
                ? dailySalesData.filter(
                    (d) => d.date >= customFromDate && d.date <= customToDate
                  )
                : salesData
            }
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey={useCustomRange ? "date" : "period"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#22c55e" name="فروش" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* محصولات پرفروش */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">محصولات پرفروش</h2>
        <table className="w-full text-right table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">نام محصول</th>
              <th className="border border-gray-300 px-4 py-2">تعداد فروش</th>
              <th className="border border-gray-300 px-4 py-2">درآمد (تومان)</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((prod) => (
              <tr key={prod.name}>
                <td className="border border-gray-300 px-4 py-2">{prod.name}</td>
                <td className="border border-gray-300 px-4 py-2">{prod.salesCount}</td>
                <td className="border border-gray-300 px-4 py-2">{prod.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* محصولات کم‌موجود */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-red-600">محصولات کم‌موجود</h2>
        <table className="w-full text-right table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">نام محصول</th>
              <th className="border border-gray-300 px-4 py-2">موجودی</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((prod) => (
              <tr key={prod.name}>
                <td className="border border-gray-300 px-4 py-2">{prod.name}</td>
                <td className="border border-gray-300 px-4 py-2">{prod.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
