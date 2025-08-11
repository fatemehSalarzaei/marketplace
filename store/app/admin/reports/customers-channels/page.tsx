'use client';

import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const customerActivityData = [
  { period: "دیروز", newCustomers: 25, activeCustomers: 120 },
  { period: "هفته گذشته", newCustomers: 150, activeCustomers: 800 },
  { period: "ماه گذشته", newCustomers: 600, activeCustomers: 3200 },
  { period: "سال گذشته", newCustomers: 7200, activeCustomers: 35000 },
];

// داده فرضی روزانه برای بازه دلخواه (نمونه)
const dailyCustomerData = [
  { date: "2025-08-01", newCustomers: 3, activeCustomers: 15 },
  { date: "2025-08-02", newCustomers: 5, activeCustomers: 25 },
  { date: "2025-08-03", newCustomers: 4, activeCustomers: 22 },
  { date: "2025-08-04", newCustomers: 7, activeCustomers: 28 },
  { date: "2025-08-05", newCustomers: 6, activeCustomers: 30 },
  { date: "2025-08-06", newCustomers: 8, activeCustomers: 40 },
];

const topCustomers = [
  { name: "سارا احمدی", orders: 12, totalSpent: 3600000 },
  { name: "محمد رضایی", orders: 9, totalSpent: 2700000 },
  { name: "لیلا موسوی", orders: 7, totalSpent: 2100000 },
];

export default function CustomersReport() {
  const [selectedPeriod, setSelectedPeriod] = useState("ماه گذشته");
  const [useCustomRange, setUseCustomRange] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredData, setFilteredData] = useState(customerActivityData);

  useEffect(() => {
    if (useCustomRange && fromDate && toDate) {
      const filtered = dailyCustomerData.filter(
        (d) => d.date >= fromDate && d.date <= toDate
      );
      setFilteredData(filtered);
    } else {
      const filtered = customerActivityData.filter(
        (item) => item.period === selectedPeriod
      );
      setFilteredData(filtered);
    }
  }, [selectedPeriod, useCustomRange, fromDate, toDate]);

  // جمع کل مشتریان جدید و فعال (برای نمایش عددی)
  const totalNewCustomers = filteredData.reduce((acc, cur) => acc + cur.newCustomers, 0);
  const totalActiveCustomers = filteredData.reduce((acc, cur) => acc + cur.activeCustomers, 0);

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-6">گزارشات مشتریان</h1>

      {/* انتخاب بازه زمانی */}
      <div className="mb-6 space-y-3 max-w-md">
        <label className="block font-semibold">نوع بازه زمانی:</label>
        <div className="flex items-center gap-4">
          <select
            disabled={useCustomRange}
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="border border-gray-300 rounded px-3 py-2 flex-1"
          >
            {customerActivityData.map((item) => (
              <option key={item.period} value={item.period}>
                {item.period}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 flex-shrink-0">
            <input
              type="checkbox"
              checked={useCustomRange}
              onChange={() => setUseCustomRange((prev) => !prev)}
            />
            بازه دلخواه
          </label>
        </div>

        {useCustomRange && (
          <div className="flex gap-4 mt-2">
            <div className="flex flex-col flex-1">
              <label className="mb-1 font-semibold">از تاریخ:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-1 font-semibold">تا تاریخ:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
        )}
      </div>

      {/* عدد مشتریان جدید و فعال */}
      <div className="flex gap-8 text-center">
        <div className="bg-blue-100 p-4 rounded flex-1">
          <p className="text-blue-700 font-semibold">مشتریان جدید</p>
          <p className="text-3xl font-bold">{totalNewCustomers}</p>
        </div>
        <div className="bg-green-100 p-4 rounded flex-1">
          <p className="text-green-700 font-semibold">مشتریان فعال</p>
          <p className="text-3xl font-bold">{totalActiveCustomers}</p>
        </div>
      </div>

      {/* نمودار تعداد مشتریان جدید و فعال */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">تعداد مشتریان جدید و فعال</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey={useCustomRange ? "date" : "period"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="newCustomers"
              stroke="#3b82f6"
              name="مشتریان جدید"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="activeCustomers"
              stroke="#10b981"
              name="مشتریان فعال"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* مشتریان برتر */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">مشتریان برتر</h2>
        <table className="w-full text-right table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">نام مشتری</th>
              <th className="border border-gray-300 px-4 py-2">تعداد سفارشات</th>
              <th className="border border-gray-300 px-4 py-2">مجموع خرید (تومان)</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((customer) => (
              <tr key={customer.name}>
                <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.orders}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.totalSpent.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
