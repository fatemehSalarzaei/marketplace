'use client'

import React, { useState } from 'react'
import { Order } from '@/types/admin/orders/orders'
import EditOrderStatusModal from './EditOrderStatusModal'
import { CheckCircle, XCircle, Loader, PackageCheck } from 'lucide-react'

interface Props {
  order: Order
  onStatusUpdated: (newStatus: string) => void
}

const statusMap: Record<string, string> = {
  pending: 'در انتظار پرداخت',
  paid: 'پرداخت‌شده',
  processing: 'در حال پردازش',
  shipped: 'ارسال‌شده',
  delivered: 'تحویل داده شده',
  canceled: 'لغو شده',
  cancelled: 'لغو شده',  // برای اطمینان از تطابق با دو حالت
}

export default function OrderGeneralInfo({ order, onStatusUpdated }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const formatCurrency = (value: string | number) => {
    const number = Number(value)
    const formatted = number.toLocaleString('fa-IR')
    return <span className="inline-block text-left">{formatted} تومان</span>
  }

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Loader className="w-5 h-5 text-yellow-500 inline-block ml-2" />
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-500 inline-block ml-2" />
      case 'processing':
        return <PackageCheck className="w-5 h-5 text-blue-500 inline-block ml-2" />
      case 'shipped':
        return <PackageCheck className="w-5 h-5 text-blue-500 inline-block ml-2" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500 inline-block ml-2" />
      case 'canceled':
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500 inline-block ml-2" />
      default:
        return null
    }
  }

  return (
    <div className="rounded-xl ring-1 ring-gray-200 p-5 bg-white shadow-sm mb-4 space-y-3">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">اطلاعات سفارش</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm text-gray-700">
        <div><span className="font-medium">شماره سفارش:</span> {order.order_number}</div>
        <div>
          <span className="font-medium">وضعیت:</span> {renderStatusIcon(order.status)} {statusMap[order.status] || order.status}
        </div>
        <div><span className="font-medium">مبلغ کل:</span> {formatCurrency(order.total_price)}</div>
        <div><span className="font-medium">هزینه ارسال:</span> {formatCurrency(order.delivery_price)}</div>
        <div><span className="font-medium">مبلغ نهایی:</span> {formatCurrency(order.final_price)}</div>
        <div>
          <span className="font-medium">پرداخت شده:</span>
          <span className={`ml-2 font-bold ${order.is_paid ? 'text-green-600' : 'text-red-600'}`}>
            {order.is_paid ? 'بله' : 'خیر'}
          </span>
        </div>
        <div><span className="font-medium">شیوه ارسال:</span> {order.shipping_method.name || '—'}</div>
        <div className="col-span-full">
          <span className="font-medium">تاریخ ثبت سفارش:</span> {new Date(order.created_at).toLocaleString('fa-IR')}
        </div>
      </div>

      {order.status !== 'delivered' && order.status !== 'canceled' && order.status !== 'cancelled' && (
        <div className="pt-4">
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            ویرایش وضعیت
          </button>
        </div>
      )}

      <EditOrderStatusModal
        orderId={order.id}
        currentStatus={order.status}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStatusChange={(newStatus) => {
          onStatusUpdated(newStatus)
          handleCloseModal()
        }}
      />
    </div>
  )
}
