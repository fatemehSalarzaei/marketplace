"use client";
import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { CustomerActivity } from "@/types/admin/report/customersReportTypes";
interface Props {
  data: CustomerActivity[];
  useCustomRange: boolean;
}

export default function CustomerChart({ data, useCustomRange }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">تعداد مشتریان جدید و فعال</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey={useCustomRange ? "date" : "period"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="newCustomers" stroke="#3b82f6" name="مشتریان جدید" strokeWidth={2} />
          <Line type="monotone" dataKey="activeCustomers" stroke="#10b981" name="مشتریان فعال" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
