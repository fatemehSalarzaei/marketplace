"use client";

import React, { useState } from 'react'

interface Props {
  onFilter: (filters: Record<string, any>) => void
}

const LogFilters: React.FC<Props> = ({ onFilter }) => {
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilter({
      search: search || undefined,
      timestamp_after: dateFrom || undefined,
      timestamp_before: dateTo || undefined,
    })
  }

  return (
    <form className="flex flex-wrap gap-2 mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="جستجو بر اساس نام، نام خانوادگی یا شماره تلفن"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border px-2 py-1"
      />
      <input
        type="datetime-local"
        value={dateFrom}
        onChange={e => setDateFrom(e.target.value)}
        className="border px-2 py-1"
      />
      <input
        type="datetime-local"
        value={dateTo}
        onChange={e => setDateTo(e.target.value)}
        className="border px-2 py-1"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1">اعمال فیلتر</button>
    </form>
  )
}

export default LogFilters
