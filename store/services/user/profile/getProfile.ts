import apiClient from '@/lib/axiosInstance'
import { API_ENDPOINTS } from '@/lib/config'
import type { UserProfileResponse } from '@/types/profile/profile'

export async function getUserProfile(): Promise<UserProfileResponse> {
  const res = await apiClient.get(API_ENDPOINTS.getProfile)
  return res.data
}
