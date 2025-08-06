'use client'

import React, { useEffect, useState } from 'react'
import { Order, PaginatedOrders } from '@/types/admin/orders/orders'
import { fetchAdminOrders } from '@/services/admin/orders/orders'
import InvoiceRow from './InvoiceRow'
import Pagination from './Pagination'
import InvoiceFilters from './InvoiceFilters'

const InvoiceList: React.FC = () => {
  const [ordersPage, setOrdersPage] = useState<PaginatedOrders | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<{
    status?: string
    is_paid?: boolean
    search?: string
  }>({})
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loadOrders = async () => {
    setLoading(true)
    try {
      const data = await fetchAdminOrders({
        page: currentPage,
        ...filters,
      })
      setOrdersPage(data)
      setErrorMessage(null)
    } catch {
      setErrorMessage('خطا در دریافت سفارش‌ها')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [currentPage, filters])

  const onFiltersUpdate = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  return (
    <div className="p-4 space-y-4">
      {/* فیلترها */}
      <InvoiceFilters onFiltersUpdate={onFiltersUpdate} />

      {/* جدول */}
      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : ordersPage && ordersPage.results.length > 0 ? (
        <>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">شماره سفارش</th>
                <th className="border border-gray-300 px-4 py-2">نام مشتری</th>
                <th className="border border-gray-300 px-4 py-2">وضعیت</th>
                <th className="border border-gray-300 px-4 py-2">قیمت نهایی</th>
                <th className="border border-gray-300 px-4 py-2">تاریخ ایجاد</th>
                <th className="border border-gray-300 px-4 py-2">فاکتور</th>
              </tr>
            </thead>
            <tbody>
              {ordersPage.results.map((order: Order) => (
                <InvoiceRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(ordersPage.count / ordersPage.page_size)}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <p className="text-gray-500 text-center py-8">هیچ سفارشی یافت نشد.</p>
      )}
    </div>
  )
}

export default InvoiceList
