import React from 'react'
import { OrderItem } from '@/types/admin/returnRequests/details/returnRequests'

export default function OrderItemsSection({ items }: { items: OrderItem[] }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">آیتم‌های سفارش</h3>
      {items.map(item => (
        <div key={item.id} className="bg-gray-50 p-4 rounded-2xl shadow-sm">
          <p className="mb-2 font-bold text-lg">{item.title_snapshot}</p>
          <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-sm">
            <div>
              <p className="font-semibold">تعداد:</p>
              <p>{item.quantity}</p>
            </div>
            <div>
              <p className="font-semibold">قیمت واحد:</p>
              <p>{item.unit_price}</p>
            </div>
            <div>
              <p className="font-semibold">قیمت کل:</p>
              <p>{item.total_price}</p>
            </div>
            <div>
              <p className="font-semibold">کد محصول:</p>
              <p>{item.variant.sku}</p>
            </div>
            <div>
              <p className="font-semibold">فعال:</p>
              <p>{item.variant.is_active ? 'بله' : 'خیر'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
