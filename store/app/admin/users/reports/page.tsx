"use client";

import React, { useEffect, useState } from 'react'
import LogTable from '@/components/admin/Log/LogTable'
import LogFilters from '@/components/admin/Log/LogFilters'
import Pagination from '@/components/notifications/Pagination'
import { fetchLogs } from '@/services/admin/logs/logsService'
import { LogEntry } from '@/types/admin/logs/logs'

const AdminLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [filters, setFilters] = useState<Record<string, any>>({})

  const loadLogs = async (page = 1, filterParams?: Record<string, any>) => {
    setLoading(true)
    try {
      const params = { ...filterParams, page, page_size: pageSize }
      const data = await fetchLogs(params)
      setLogs(data.results)
      setCount(data.count)
      setCurrentPage(page)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (newFilters: Record<string, any>) => {
    setFilters(newFilters)
    loadLogs(1, newFilters)
  }

  const handlePageChange = (page: number) => {
    loadLogs(page, filters)
  }

  const totalPages = Math.ceil(count / pageSize)

  useEffect(() => {
    loadLogs()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">گزارش فعالیت ادمین‌ها</h1>
      <LogFilters onFilter={handleFilter} />
      {loading ? <div>در حال بارگذاری...</div> : <LogTable logs={logs} />}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default AdminLogsPage
