'use client';
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

interface Props {
  data: any[];
  useCustomRange: boolean;
}

export default function SalesChart({ data, useCustomRange }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">روند فروش (تومان)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis dataKey={useCustomRange ? "date" : "period"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={useCustomRange ? "sales" : "sales"} fill="#22c55e" name="فروش" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
