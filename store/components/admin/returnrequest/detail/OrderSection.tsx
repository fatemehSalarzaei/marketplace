import React from 'react'
import { ReturnRequestDetail } from '@/types/admin/returnRequests/details/returnRequests'

const statusMap: Record<string, string> = {
  pending: 'در انتظار پرداخت',
  paid: 'پرداخت‌شده',
  processing: 'در حال پردازش',
  shipped: 'ارسال‌شده',
  delivered: 'تحویل داده شده',
  canceled: 'لغو شده',
}

export default function OrderSection({ order }: { order: ReturnRequestDetail['order'] }) {
  return (
    <div>
      <h3 className="font-semibold mb-4">اطلاعات سفارش</h3>
      <div className="grid grid-cols-3 gap-x-6 gap-y-3 text-sm">
        <div>
          <p className="font-semibold">کد سفارش:</p>
          <p>#{order.order_number}</p>
        </div>
        <div>
          <p className="font-semibold">وضعیت:</p>
          <p>{statusMap[order.status] || order.status}</p>
        </div>
        <div>
          <p className="font-semibold">پرداخت شده:</p>
          <p>{order.is_paid ? 'بله' : 'خیر'}</p>
        </div>

        <div>
          <p className="font-semibold">مبلغ کل:</p>
          <p>{order.total_price}</p>
        </div>
        <div>
          <p className="font-semibold">مبلغ نهایی:</p>
          <p>{order.final_price}</p>
        </div>
        <div>
          <p className="font-semibold">تاریخ ثبت سفارش:</p>
          <p>{order.created_at}</p>
        </div>

        <div>
          <p className="font-semibold">هزینه ارسال:</p>
          <p>{order.delivery_price}</p>
        </div>
      </div>
    </div>
  )
}
