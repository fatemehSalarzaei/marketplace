import React from 'react'
import { RevenueData } from '@/types/admin/report/FinancialLogisticsReport'

interface Props {
  data: RevenueData
}

export default function RevenueSummary({ data }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <p className="text-gray-600 mb-2">درآمد کل</p>
        <p className="text-3xl font-bold text-green-600">{data.total.toLocaleString()} تومان</p>
      </div>
      {/* <div className="flex-1 grid grid-cols-1 gap-3">
        <div className="bg-green-100 p-3 rounded text-green-800 font-semibold">
          نقدی: {data.cash.toLocaleString()} تومان
        </div>
        <div className="bg-blue-100 p-3 rounded text-blue-800 font-semibold">
          اعتباری: {data.credit.toLocaleString()} تومان
        </div>
      </div> */}
    </div>
  )
}
