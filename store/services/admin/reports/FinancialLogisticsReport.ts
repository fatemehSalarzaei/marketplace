// service.ts
import apiClient from '@/lib/axiosInstance'
import { API_ENDPOINTS_ADMIN } from '@/lib/config'
import { FinancialLogisticsResponse } from '@/types/admin/report/FinancialLogisticsReport'

export async function fetchFinancialLogisticsReport(
  startDate?: string,
  endDate?: string
): Promise<FinancialLogisticsResponse> {
  const params: Record<string, string> = {}
  if (startDate) params.start_date = startDate
  if (endDate) params.end_date = endDate

  const response = await apiClient.get<FinancialLogisticsResponse>(API_ENDPOINTS_ADMIN.financial_logistics, { params })
  return response.data
}
