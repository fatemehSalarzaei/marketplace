'use client'

import React from 'react'
import { AdminReview } from '@/types/admin/review/review'
import { Button } from '@/components/ui/Button'
import { formatDateTime } from '@/lib/utils'

interface Props {
  reviews: AdminReview[]
  onEdit: (review: AdminReview) => void
}

const getStatusLabel = (status: string | undefined) => {
  switch (status) {
    case 'approved':
      return 'تایید شده'
    case 'rejected':
      return 'رد شده'
    case 'pending':
    default:
      return 'در انتظار تایید'
  }
}

export default function ReviewTable({ reviews, onEdit }: Props) {
  return (
    <div className="border rounded-md overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">محصول</th>
            <th className="p-2">کاربر</th>
            <th className="p-2">امتیاز</th>
            <th className="p-2">نظر</th>
            <th className="p-2">تاریخ</th>
            <th className="p-2">وضعیت</th>
            <th className="p-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id} className="border-t">
              <td className="p-2">{review.product.name || review.product_name || review.product}</td>
              <td className="p-2">
                {review.user.first_name} {review.user.last_name}
              </td>
              <td className="p-2">{review.rating}</td>
              <td className="p-2">{review.comment?.slice(0, 40)}...</td>
              <td className="p-2">{formatDateTime(review.created_at)}</td>
              <td className="p-2">{getStatusLabel(review.status)}</td>
              <td className="p-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(review)}>
                  ویرایش
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
