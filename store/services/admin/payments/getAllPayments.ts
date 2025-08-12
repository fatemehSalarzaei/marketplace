import apiClient from '@/lib/axiosInstance'
import { API_ENDPOINTS_ADMIN } from '@/lib/config'
import { PaymentData } from '@/types/admin/Payments/Payments'



export const fetchPayments = async (
  page: number = 1,
  status?: string,
  search?: string
) => {
  const params: Record<string, any> = { page, page_size: 10 }
  if (status) params.status = status
  if (search) params.search = search

  const response = await apiClient.get(API_ENDPOINTS_ADMIN.payments, { params })
  return response.data
}
