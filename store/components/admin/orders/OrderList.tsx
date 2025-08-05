'use client'

import React, { useEffect, useState } from 'react'
import { Order, PaginatedOrders } from '@/types/admin/orders/orders'
import { fetchAdminOrders } from '@/services/admin/orders/orders'
import OrderRow from './OrderRow'
import Pagination from './Pagination'
import OrderFilters from './OrderFilters'

const OrderList: React.FC = () => {
  const [ordersData, setOrdersData] = useState<PaginatedOrders | null>(null)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<{
    status?: string
    is_paid?: boolean
    search?: string
  }>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const data = await fetchAdminOrders({
        page,
        ...filters,
      })
      setOrdersData(data)
      setError(null)
    } catch {
      setError('خطا در دریافت سفارش‌ها')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [page, filters])

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setPage(1)
  }

  return (
    <div className="p-4 space-y-4">
      {/* فیلترها */}
      <OrderFilters onFilterChange={handleFilterChange} />

      {/* جدول */}
      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : ordersData && ordersData.results.length > 0 ? (
        <>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">شماره سفارش</th>
                <th className="border border-gray-300 px-4 py-2">نام مشتری</th>
                <th className="border border-gray-300 px-4 py-2">وضعیت</th>
                <th className="border border-gray-300 px-4 py-2">قیمت نهایی</th>
                <th className="border border-gray-300 px-4 py-2">تاریخ ایجاد</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.results.map((order: Order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={page}
            totalPages={Math.ceil(ordersData.count / ordersData.page_size)}
            onPageChange={setPage}
          />
        </>
      ) : (
        <p className="text-gray-500 text-center py-8">هیچ سفارشی یافت نشد.</p>
      )}
    </div>
  )
}

export default OrderList
