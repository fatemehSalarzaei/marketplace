'use client'

import React from 'react'
import { IReturnRequestSummary } from '@/types/admin/returnRequests/returnRequests'
import { useAuth } from '@/context/AuthContext'

interface ReturnRequestTableProps {
  data: IReturnRequestSummary[]
  loading: boolean
  onSelect: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'در انتظار بررسی'
    case 'approved':
      return 'تأیید شده'
    case 'rejected':
      return 'رد شده'
    case 'refunded':
      return 'مبلغ بازگشت داده شد'
    default:
      return 'نامشخص'
  }
}

export default function ReturnRequestTable({
  data,
  loading,
  onSelect,
  onEdit,
  onDelete,
}: ReturnRequestTableProps) {
  const { hasPermission } = useAuth()

  if (loading) return <p>در حال بارگذاری...</p>
  if (data.length === 0) return <p className="text-center text-gray-500 py-10">هیچ داده‌ای یافت نشد.</p>

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 px-4 py-2">شماره درخواست</th>
          <th className="border border-gray-300 px-4 py-2">نام مشتری</th>
          <th className="border border-gray-300 px-4 py-2">وضعیت</th>
          <th className="border border-gray-300 px-4 py-2">تاریخ ثبت</th>
          <th className="border border-gray-300 px-4 py-2">عملیات</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2 text-center">{item.id}</td>
            <td className="border border-gray-300 px-4 py-2">{item.user.first_name} {item.user.last_name}</td>
            <td className="border border-gray-300 px-4 py-2">{getStatusLabel(item.status)}</td>
            <td className="border border-gray-300 px-4 py-2">{new Date(item.requested_at).toLocaleDateString('fa-IR')}</td>
            <td className="border border-gray-300 px-4 py-2 text-center flex justify-center gap-2">
              <button
                onClick={() => onSelect(item.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                مشاهده
              </button>

              {hasPermission('returnrequest', 'update') && onEdit && (
                <button
                  onClick={() => onEdit(item.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  ویرایش
                </button>
              )}

              {hasPermission('returnrequest', 'delete') && onDelete && (
                <button
                  onClick={() => onDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  حذف
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
