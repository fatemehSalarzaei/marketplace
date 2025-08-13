import apiClient from '@/lib/axiosInstance'
import { API_ENDPOINTS_ADMIN } from '@/lib/config'
import { LogEntryResponse } from '@/types/admin/logs/logs'

export const fetchLogs = async (params?: Record<string, any>): Promise<LogEntryResponse> => {
  const response = await apiClient.get<LogEntryResponse>(API_ENDPOINTS_ADMIN.logs, { params })
  return response.data
}
