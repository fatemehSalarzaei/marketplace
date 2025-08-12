'use client';
import React from 'react';

interface Props {
  totalSales: number;
  periodLabel: string;
}

export default function TotalSalesCard({ totalSales, periodLabel }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <p className="text-gray-500">مجموع فروش در {periodLabel}:</p>
        <p className="text-3xl font-bold text-green-600">
          {totalSales.toLocaleString()} تومان
        </p>
      </div>
    </div>
  );
}
