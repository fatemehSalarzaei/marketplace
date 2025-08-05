import apiClient from '@/lib/axiosInstance'
import { API_ENDPOINTS } from '@/lib/config'
import type { UserProfileUpdateRequest } from '@/types/profile/profile'

export async function updateUserProfile(data: UserProfileUpdateRequest) {
  const res = await apiClient.put(API_ENDPOINTS.updateProfile, data)
  return res.data
}
