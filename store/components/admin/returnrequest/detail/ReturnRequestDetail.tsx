'use client'

import React from 'react'
import { ReturnRequestDetail } from '@/types/admin/returnRequests/details/returnRequests'
import StatusSection from './StatusSection'
import UserSection from './UserSection'
import OrderSection from './OrderSection'
import OrderItemsSection from './OrderItemsSection'

interface Props {
  data: ReturnRequestDetail | null
}

export default function ReturnRequestDetailView({ data }: Props) {
  if (!data) return null

  return (
    <div className="space-y-6 bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-2">جزئیات درخواست مرجوعی</h2>

      <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
        <StatusSection data={data} />
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
        <UserSection user={data.user} />
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
        <OrderSection order={data.order} />
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
        <OrderItemsSection items={data.order_items} />
      </div>
    </div>
  )
}
