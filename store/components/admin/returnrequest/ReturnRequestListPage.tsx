'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

import ReturnRequestFilterPanel from './ReturnRequestFilterPanel'
import ReturnRequestTable from './ReturnRequestTable'
import Pagination from './Pagination'
import { IReturnRequestSummary } from '@/types/admin/returnRequests/returnRequests'
import { getReturnRequests } from '@/services/admin/returnRequests/returnRequests'

export default function ReturnRequestListPage() {
  const router = useRouter()
  const { hasPermission } = useAuth()

  const [filters, setFilters] = useState<{ status?: string; query?: string }>({})
  const [data, setData] = useState<IReturnRequestSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    if (hasPermission('returnrequest', 'read')) {
      fetchData()
    } else {
      setData([])
      setTotalCount(0)
    }
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
    if (hasPermission('returnrequest', 'read')) {
      router.push(`/admin/return-requests/${id}`)
    }
  }

  if (!hasPermission('returnrequest', 'read')) {
    return <p className="text-red-600 text-center py-10">شما مجوز مشاهده درخواست‌های مرجوعی را ندارید.</p>
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
