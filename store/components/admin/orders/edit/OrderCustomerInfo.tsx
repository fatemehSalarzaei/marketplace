'use client'

import React from 'react'
import { Order } from '@/types/admin/orders/orders'

interface Props {
  order: Order
}

export default function OrderCustomerInfo({ order }: Props) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 mb-4 space-y-3">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-3">
        مشخصات مشتری
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">نام:</span>{' '}
          {order.user?.full_name || '---'}
        </div>
        <div>
          <span className="font-medium">ایمیل:</span>{' '}
          {order.user?.email || '---'}
        </div>
        <div>
          <span className="font-medium">شماره تماس:</span>{' '}
          {order.user?.phone_number || '---'}
        </div>
      </div>
    </div>
  )
}
