import apiClient from '@/lib/axiosInstance'
import { API_ENDPOINTS_ADMIN } from '@/lib/config'
import { PaymentGateway } from '@/types/admin/paymentGateway/paymentGatewayTypes'

export const getPaymentGateways = async (): Promise<PaymentGateway[]> => {
  const res = await apiClient.get(API_ENDPOINTS_ADMIN.payment_gateways)
  return res.data.results
}
export const togglePaymentGatewayStatus = async (id: number, isActive: boolean): Promise<void> => {
  const res = await apiClient.patch(`${API_ENDPOINTS_ADMIN.payment_gateways}${id}/`, {
    is_active: !isActive, // معکوس مقدار فعلی
  })
  return res.data
}