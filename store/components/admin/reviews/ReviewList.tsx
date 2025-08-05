'use client'

import React, { useEffect, useState } from 'react'
// import ReviewFilters from './ReviewFilters'
import ReviewTable from './ReviewTable'
import ReviewEditModal from './ReviewEditModal'
import { getReviews } from '@/services/admin/review/reviewService'
import { AdminReview } from '@/types/admin/review/review'
import Pagination from '../categories/Pagination'

export default function ReviewList() {
  const [reviews, setReviews] = useState<AdminReview[]>([])
  const [selectedReview, setSelectedReview] = useState<AdminReview | null>(null)
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<{ product?: string; rating?: string }>({})
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const fetchReviews = async () => {
    const params = { page, ...filters }
    const response = await getReviews(params)

    // فرض می‌کنیم API اطلاعات محصول (عنوان) و کاربر را کامل می‌دهد یا backend آنها را اضافه کرده است.
    setReviews(response.results)
    setTotalCount(response.count)
  }

  useEffect(() => {
    fetchReviews()
  }, [page, filters])

  const handleEdit = (review: AdminReview) => {
    setSelectedReview(review)
    setOpen(true)
  }

  const handleClose = () => {
    setSelectedReview(null)
    setOpen(false)
    fetchReviews() // رفرش لیست پس از بستن دیالوگ
  }

  return (
    <div className="space-y-4">
      {/* <ReviewFilters setFilters={setFilters} /> */}
      <ReviewTable reviews={reviews} onEdit={handleEdit} />
      <Pagination page={page} total={totalCount} onPageChange={setPage} />
      <ReviewEditModal open={open} onClose={handleClose} review={selectedReview} />
    </div>
  )
}
