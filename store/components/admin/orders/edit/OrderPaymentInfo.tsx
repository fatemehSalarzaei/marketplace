'use client'

import React from 'react'
import { Order } from '@/types/admin/orders/orders'
import { CheckCircle, XCircle, CreditCard } from 'lucide-react'

interface Props {
  order: Order
}

export default function OrderPaymentInfo({ order }: Props) {
  return (
    <div className="bg-gray-50 p-5 rounded-2xl shadow-sm space-y-3">
      <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-blue-500" />
        اطلاعات پرداخت
      </h2>
      
      <div className="space-y-1 text-gray-600">
        <p className="flex items-center gap-2">
          {order.is_paid ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : (
            <XCircle className="w-4 h-4 text-red-600" />
          )}
          <span>وضعیت پرداخت: {order.is_paid ? 'پرداخت شده' : 'پرداخت نشده'}</span>
        </p>
        <p>مبلغ کل: {order.total_price.toLocaleString()} تومان</p>
        <p>روش پرداخت: {order.payment_method || '---'}</p>
        {order.payment?.paid_at && (
          <p>تاریخ پرداخت: {new Date(order.payment.paid_at).toLocaleString()}</p>
        )}
      </div>
    </div>
  )
}
