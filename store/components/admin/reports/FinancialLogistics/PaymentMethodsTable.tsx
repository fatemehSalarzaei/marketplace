import React from 'react'
import { PaymentMethodData } from '@/types/admin/report/FinancialLogisticsReport'

interface Props {
  data: PaymentMethodData[]
}

export default function PaymentMethodsTable({ data }: Props) {
  return (
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
          {data.map((item) => (
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
  )
}
