'use client'

import React from 'react'
import { Order } from '@/types/admin/orders/orders'

interface Props {
  order: Order
}

export default function OrderShippingInfo({ order }: Props) {
  const address = order.shipping_address
  return (
    <div className="bg-gray-50 rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">آدرس ارسال</h2>
      <div className="space-y-1 text-gray-700">
        <p>{address?.first_name}  {address?.last_name}</p>
        <p> {address?.province_name}, {address?.city_name}, {address?.street_address}</p>
        <p>کد پستی: {address?.postal_code}</p>
        <p>شماره تماس: {address?.phone_number}</p>
      </div>
    </div>
  )
}
