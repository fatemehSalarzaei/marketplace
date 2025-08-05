import apiClient from '@/lib/axiosInstance'
import { API_ENDPOINTS_ADMIN } from '@/lib/config'
import { AdminReview } from '@/types/admin/review/review'

export interface PaginatedReviewResponse {
  count: number
  next: string | null
  previous: string | null
  results: AdminReview[]
}

// پارامتر url یا پارامترهای فیلتر و صفحه
export const getReviews = async (params?: any): Promise<PaginatedReviewResponse> => {
  // اگر url مستقیم است از آن استفاده کن، در غیر اینصورت از API_ENDPOINTS_ADMIN.reviews با پارامترها
  if (typeof params === 'string') {
    const res = await apiClient.get(params)
    return res.data
  } else {
    const res = await apiClient.get(API_ENDPOINTS_ADMIN.reviews, { params })
    return res.data
  }
}

export const updateReview = async (id: number, data: Partial<AdminReview>): Promise<AdminReview> => {
  const res = await apiClient.patch(`${API_ENDPOINTS_ADMIN.reviews}${id}/`, data)
  return res.data
}

export const approveReview = async (id: number) => {
  return updateReview(id, { status: 'approved' })
}

export const disapproveReview = async (id: number) => {
  return updateReview(id, {status: 'rejected' })
}
