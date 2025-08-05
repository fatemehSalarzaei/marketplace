'use client'

import React from 'react'
import { AdminReview } from '@/types/admin/review/review'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/Button'
import { approveReview, disapproveReview } from '@/services/admin/review/reviewService'

interface Props {
  open: boolean
  onClose: () => void
  review: AdminReview | null
}

export default function ReviewEditModal({ open, onClose, review }: Props) {
  const handleApprove = async () => {
    if (review) {
      await approveReview(review.id)
      onClose()
    }
  }

  const handleDisapprove = async () => {
    if (review) {
      await disapproveReview(review.id)
      onClose()
    }
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>بررسی نظر</DialogTitle>
        </DialogHeader>
        {review && (
          <div className="space-y-4">
            <p>
              <strong>کاربر:</strong> {review.user.first_name} {review.user.last_name}
            </p>
            <p>
              <strong>محصول:</strong> {typeof review.product === 'string' ? review.product : review.product.name}
            </p>
            <p>
              <strong>امتیاز:</strong> {review.rating}
            </p>
            <p>
              <strong>نظر:</strong> {review.comment}
            </p>
            <p>
              <strong>وضعیت:</strong> {getStatusLabel(review.status)}
            </p>
            <div className="flex gap-4">
              <Button onClick={handleApprove}>تایید</Button>
              <Button variant="outline" onClick={handleDisapprove}>
                رد
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
