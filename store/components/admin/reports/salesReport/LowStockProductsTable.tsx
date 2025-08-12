'use client';
import React from 'react';
import { LowStockProduct } from '@/types/admin/report/salesReportTypes';

interface Props {
  products: LowStockProduct[];
}

export default function LowStockProductsTable({ products }: Props) {
  return (
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
          {products.map((prod) => (
            <tr key={prod.variant_id}>
              <td className="border border-gray-300 px-4 py-2">{prod.product_name}</td>
              <td className="border border-gray-300 px-4 py-2">{prod.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
