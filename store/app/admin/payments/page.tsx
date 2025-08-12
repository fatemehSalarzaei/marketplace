'use client'

import React, { useEffect, useState } from 'react'
import { fetchPayments } from '@/services/admin/payments/getAllPayments'
import { PaymentData, PaginatedResponse } from '@/types/admin/Payments/Payments'
import PaymentList from '@/components/admin/Payment/PaymentList'
import Pagination from '@/components/notifications/Pagination'

const statusOptions = [
  { value: '', label: 'همه وضعیت‌ها' },
  { value: 'pending', label: 'در انتظار' },
  { value: 'success', label: 'موفق' },
  { value: 'failed', label: 'ناموفق' },
  { value: 'refunded', label: 'بازگشت داده شده' },
]

export default function PaymentsPage() {
  const [paymentsData, setPaymentsData] = useState<PaginatedResponse<PaymentData> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const pageSize = 10

  useEffect(() => {
    setLoading(true)
    fetchPayments(page, statusFilter, searchTerm)
      .then(data => setPaymentsData(data))
      .catch(() => setError('خطا در بارگذاری داده‌ها'))
      .finally(() => setLoading(false))
  }, [page, statusFilter, searchTerm])

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setPage(1)
  }

  const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">مدیریت پرداخت‌ها</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="جستجو بر اساس شماره سفارش یا نام کاربر"
          value={searchTerm}
          onChange={onSearchChange}
          className="border rounded px-3 py-2 flex-1"
        />
        <select
          value={statusFilter}
          onChange={onStatusChange}
          className="border rounded px-3 py-2"
        >
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center p-6">در حال بارگذاری...</p>
      ) : error ? (
        <p className="text-center p-6 text-red-600">{error}</p>
      ) : paymentsData && paymentsData.results.length > 0 ? (
        <>
          <PaymentList payments={paymentsData.results} />
          <Pagination
            currentPage={page}
            totalItems={paymentsData.count}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </>
      ) : (
        <p className="text-center p-6">هیچ پرداختی یافت نشد.</p>
      )}
    </div>
  )
}
