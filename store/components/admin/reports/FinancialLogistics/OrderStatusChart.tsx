import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { OrderStatusData } from '@/types/admin/report/FinancialLogisticsReport'

interface Props {
  data: OrderStatusData[]
}

export default function OrderStatusChart({ data }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">وضعیت سفارش‌ها در لجستیک</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
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
          تعداد سفارش‌ها در وضعیت <span className="font-semibold">{selectedStatus}</span> :{' '}
          {data.find((item) => item.status === selectedStatus)?.count || 0}
        </p>
      )}
    </div>
  )
}
