// InvoiceList.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Order, PaginatedOrders } from '@/types/admin/orders/orders'
import { fetchAdminOrders } from '@/services/admin/orders/orders'
import InvoiceRow from './InvoiceRow'
import Pagination from './Pagination'
import InvoiceFilters from './InvoiceFilters'

const InvoiceList: React.FC = () => {
  const { hasPermission, loadingPermissions } = useAuth()
  const [ordersPage, setOrdersPage] = useState<PaginatedOrders | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<{ status?: string; is_paid?: boolean; search?: string }>({})
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loadOrders = async () => {
    setLoading(true)
    try {
      const data = await fetchAdminOrders({ page: currentPage, ...filters })
      setOrdersPage(data)
      setErrorMessage(null)
    } catch {
      setErrorMessage('Error fetching orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (hasPermission('invoice', 'read')) {
      loadOrders()
    }
  }, [currentPage, filters, hasPermission])

  const onFiltersUpdate = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  if (loadingPermissions) return <p>Loading permissions...</p>
  if (!hasPermission('invoice', 'read')) return <p className="text-red-600">You do not have permission to view invoices.</p>

  return (
    <div className="p-4 space-y-4">
      <InvoiceFilters onFiltersUpdate={onFiltersUpdate} />
      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : ordersPage && ordersPage.results.length > 0 ? (
        <>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Order #</th>
                <th className="border border-gray-300 px-4 py-2">Customer</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Final Price</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Invoice</th>
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
        <p className="text-gray-500 text-center py-8">No orders found.</p>
      )}
    </div>
  )
}

export default InvoiceList
