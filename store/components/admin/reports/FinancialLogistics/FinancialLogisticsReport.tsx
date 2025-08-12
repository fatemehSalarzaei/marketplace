'use client'

import React, { useEffect, useState } from 'react'
import RevenueSummary from './RevenueSummary'
import PaymentMethodsTable from './PaymentMethodsTable'
import OrderStatusChart from './OrderStatusChart'
import { fetchFinancialLogisticsReport } from '@/services/admin/reports/FinancialLogisticsReport'
import {
  FinancialLogisticsResponse,
  PaymentMethodData,
  OrderStatusData,
  RevenueData,
} from '@/types/admin/report/FinancialLogisticsReport'

export default function FinancialLogisticsReport() {
  const [data, setData] = useState<FinancialLogisticsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchFinancialLogisticsReport()
      .then((res) => setData(res))
      .catch(() => setError('خطا در بارگذاری داده‌ها'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center p-6">در حال بارگذاری...</p>
  if (error) return <p className="text-center p-6 text-red-600">{error}</p>
  if (!data) return null

  // استخراج داده‌های مورد نیاز برای کامپوننت‌ها
  const revenueData: RevenueData = {
    total: data.total_revenue,
    // cash: 0, // اگر می‌خواهید داده واقعی نقدی از API بگیرید باید API را گسترش دهید
    // credit: data.total_revenue 0, // فرضی است
  }

  // استفاده از داده واقعی API برای روش‌های پرداخت
  const paymentMethodsData: PaymentMethodData[] = data.payment_methods_data

  // ساخت آرایه وضعیت سفارش‌ها از داده API
  const orderStatusData: OrderStatusData[] = Object.entries(data.order_status_summary).map(
    ([status, count]) => ({ status, count })
  )

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-6">گزارشات مالی و لجستیک</h1>

      <RevenueSummary data={revenueData} />

      <PaymentMethodsTable data={paymentMethodsData} />

      <OrderStatusChart data={orderStatusData} />
    </div>
  )
}
