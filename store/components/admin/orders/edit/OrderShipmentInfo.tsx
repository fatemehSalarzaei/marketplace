'use client'

import React from 'react'
import { Shipment } from '@/types/admin/orders/orders'

interface Props {
  shipment: Shipment
}

const statusMap: Record<string, string> = {
  pending: 'در انتظار ارسال',
  shipped: 'ارسال شده',
  in_transit: 'در حال انتقال',
  delivered: 'تحویل داده شده',
  cancelled: 'لغو شده',
}

const formatDate = (value: string | null) => {
  return value ? new Date(value).toLocaleString('fa-IR') : '—'
}

const formatCurrency = (value: number | string) => {
  const number = Number(value)
  return number.toLocaleString('fa-IR') + ' تومان'
}

const OrderShipmentInfo: React.FC<Props> = ({ shipment }) => {
  return (
    <div className="rounded-xl ring-1 ring-gray-200 p-5 bg-white shadow-sm mb-4 space-y-3">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">اطلاعات ارسال</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm text-gray-700">
        <div>
          <span className="font-medium">شیوه ارسال:</span>{' '}
          {shipment.shipping_method?.name || '—'}
        </div>
        <div>
          <span className="font-medium">کد پیگیری:</span>{' '}
          {shipment.tracking_number || '—'}
        </div>
        <div>
          <span className="font-medium">هزینه ارسال:</span>{' '}
          {formatCurrency(shipment.cost)}
        </div>
        <div>
          <span className="font-medium">وضعیت ارسال:</span>{' '}
          {statusMap[shipment.status] || shipment.status}
        </div>
        <div>
          <span className="font-medium">تاریخ ارسال:</span>{' '}
          {formatDate(shipment.shipped_at)}
        </div>
        <div>
          <span className="font-medium">تاریخ تحویل:</span>{' '}
          {formatDate(shipment.delivered_at)}
        </div>
      </div>
    </div>
  )
}

export default OrderShipmentInfo
