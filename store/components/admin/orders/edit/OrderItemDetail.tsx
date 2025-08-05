'use client'

import React from 'react'
import { OrderItem } from '@/types/admin/orders/orders'

interface Props {
  items: OrderItem[]
}

export default function OrderItemList({ items }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">محصولات سفارش</h2>
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="py-3">
            <div className="flex flex-col space-y-1 text-sm text-gray-700">
              <span>🔹 <strong>محصول:</strong> {item.variant.product.name}</span>
              <span>🔢 <strong>تعداد:</strong> {item.quantity}</span>
              <span>💰 <strong>قیمت واحد:</strong> {item.unit_price.toLocaleString()} تومان</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
