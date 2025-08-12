'use client';
import React from 'react';
import { TopProduct } from '@/types/admin/report/salesReportTypes';

interface Props {
  products: TopProduct[];
}

export default function TopProductsTable({ products }: Props) {
  return (
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
          {products.map((prod) => (
            <tr key={prod.variant_sku}>
              <td className="border border-gray-300 px-4 py-2">{prod.product_name}</td>
              <td className="border border-gray-300 px-4 py-2">{prod.total_quantity_sold}</td>
              <td className="border border-gray-300 px-4 py-2">{prod.total_revenue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
