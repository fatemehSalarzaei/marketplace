'use client'

import React, { useEffect, useState } from 'react'
import { getPaymentGateways, togglePaymentGatewayStatus } from '@/services/admin/paymentGateway/paymentGatewayService'
import { PaymentGateway } from '@/types/admin/paymentGateway/paymentGatewayTypes'
import ConfirmDialog from './ConfirmDialog'
import { useAuth } from '@/context/AuthContext'

export default function PaymentGatewayList() {
  const { hasPermission, loadingPermissions } = useAuth()
  const [gateways, setGateways] = useState<PaymentGateway[]>([])
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    if (hasPermission('paymentgateway', 'read')) {
      loadGateways()
    }
  }, [loadingPermissions])

  const loadGateways = async () => {
    try {
      const data = await getPaymentGateways()
      setGateways(data)
    } catch (error) {
      console.error('خطا در دریافت درگاه‌ها', error)
    }
  }

  const handleToggle = (gateway: PaymentGateway) => {
    if (!hasPermission('paymentgateway', 'update')) return
    setSelectedGateway(gateway)
    setShowDialog(true)
  }

  const confirmToggle = async () => {
    if (selectedGateway && hasPermission('paymentgateway', 'update')) {
      try {
        await togglePaymentGatewayStatus(selectedGateway.id, selectedGateway.is_active)
        await loadGateways()
      } catch (error) {
        console.error('خطا در تغییر وضعیت', error)
      }
    }
    setShowDialog(false)
    setSelectedGateway(null)
  }

  if (!hasPermission('paymentgateway', 'read')) {
    return <p className="text-center text-red-600 mt-10">شما دسترسی لازم برای مشاهده درگاه‌ها را ندارید.</p>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">درگاه‌های پرداخت</h2>
      <table className="w-full border text-right">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">شناسه</th>
            <th className="p-2">نام</th>
            <th className="p-2">توضیحات</th>
            <th className="p-2">وضعیت</th>
            <th className="p-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {gateways.map((gateway) => (
            <tr key={gateway.id} className="border-t">
              <td className="p-2">{gateway.id}</td>
              <td className="p-2">{gateway.name}</td>
              <td className="p-2">{gateway.description}</td>
              <td className="p-2">{gateway.is_active ? 'فعال' : 'غیرفعال'}</td>
              <td className="p-2">
                {hasPermission('paymentgateway', 'update') ? (
                  <button
                    onClick={() => handleToggle(gateway)}
                    className={`px-3 py-1 rounded text-white ${gateway.is_active ? 'bg-red-500' : 'bg-green-500'}`}
                  >
                    {gateway.is_active ? 'غیرفعال‌سازی' : 'فعال‌سازی'}
                  </button>
                ) : (
                  <span className="text-gray-400">عدم دسترسی</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDialog
        open={showDialog}
        onConfirm={confirmToggle}
        onCancel={() => setShowDialog(false)}
        message="آیا از تغییر وضعیت این درگاه مطمئن هستید؟"
      />
    </div>
  )
}
