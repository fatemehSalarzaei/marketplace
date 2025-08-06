'use client'

import React, { useState } from 'react'

interface InvoiceFiltersProps {
  onFilterChange: (filters: {
    status?: string
    is_paid?: boolean
    search?: string
  }) => void
}

export default function InvoiceFilters({ onFilterChange }: InvoiceFiltersProps) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [isPaid, setIsPaid] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilterChange({
      status: status || undefined,
      is_paid: isPaid === '' ? undefined : isPaid === 'true',
      search: search || undefined,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full bg-white p-4 rounded-xl shadow border border-gray-200"
    >
      <input
        type="text"
        placeholder="جستجو بر اساس نام یا شماره فاکتور"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      >
        <option value="">همه وضعیت‌ها</option>
        <option value="pending">در انتظار</option>
        <option value="processing">در حال پردازش</option>
        <option value="shipped">ارسال شده</option>
        <option value="delivered">تحویل داده شده</option>
        <option value="cancelled">لغو شده</option>
      </select>

      <select
        value={isPaid}
        onChange={(e) => setIsPaid(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      >
        <option value="">پرداخت همه</option>
        <option value="true">پرداخت شده</option>
        <option value="false">پرداخت نشده</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        اعمال فیلتر
      </button>
    </form>
  )
}
