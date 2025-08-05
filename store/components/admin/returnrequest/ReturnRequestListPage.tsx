'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import ReturnRequestFilterPanel from './ReturnRequestFilterPanel'
import ReturnRequestTable from './ReturnRequestTable'
import Pagination from './Pagination'
import { IReturnRequestSummary } from '@/types/admin/returnRequests/returnRequests'
import { getReturnRequests } from '@/services/admin/returnRequests/returnRequests'

export default function ReturnRequestListPage() {
  const router = useRouter()

  const [filters, setFilters] = useState<{ status?: string; query?: string }>({})
  const [data, setData] = useState<IReturnRequestSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    fetchData()
  }, [filters, page])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getReturnRequests(filters, page)
      setData(res.results)
      setTotalCount(res.count)
    } catch (error) {
      console.error('Failed to fetch return requests', error)
      setData([])
      setTotalCount(0)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterApply = (newFilters: { status?: string; query?: string }) => {
    setPage(1)
    setFilters(newFilters)
  }

  const handleResetFilters = () => {
    setPage(1)
    setFilters({})
  }

  const totalPages = Math.ceil(totalCount / 10)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  const handleSelect = (id: number) => {
    router.push(`/admin/return-requests/${id}`)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">لیست درخواست‌های مرجوعی</h1>

      <ReturnRequestFilterPanel
        onFilterApply={handleFilterApply}
        onReset={handleResetFilters}
        initialFilters={{
          status: filters.status || '',
          query: filters.query || '',
        }}
      />

      <ReturnRequestTable
        data={data}
        loading={loading}
        onSelect={handleSelect}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
