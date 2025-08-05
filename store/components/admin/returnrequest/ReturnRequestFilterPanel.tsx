'use client'

import React, { useState } from 'react'

interface FilterProps {
  onFilterApply: (filters: { status?: string; query?: string }) => void
  onReset: () => void
  initialFilters: {
    status: string
    query: string
  }
}

export default function ReturnRequestFilterPanel({ onFilterApply, onReset, initialFilters }: FilterProps) {
  const [status, setStatus] = useState(initialFilters.status)
  const [query, setQuery] = useState(initialFilters.query)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilterApply({
      status: status || undefined,
      query: query || undefined,
    })
  }

  const handleResetClick = () => {
    setStatus('')
    setQuery('')
    onReset()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-white p-4 rounded-xl shadow border border-gray-200 mb-6"
    >
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      >
        <option value="">همه وضعیت‌ها</option>
        <option value="pending">در انتظار بررسی</option>
        <option value="approved">تأیید شده</option>
        <option value="rejected">رد شده</option>
        <option value="refunded">بازپرداخت شده</option>
      </select>

      <input
        type="text"
        placeholder="جستجو (نام، شماره تماس و ...)"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          اعمال فیلتر
        </button>
        <button
          type="button"
          onClick={handleResetClick}
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          پاک کردن فیلترها
        </button>
      </div>
    </form>
  )
}
