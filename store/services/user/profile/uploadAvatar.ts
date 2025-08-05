import apiClient from '@/lib/axiosInstance'
import { API_ENDPOINTS } from '@/lib/config'
import type { AvatarUploadResponse } from '@/types/profile/avatar'

export async function uploadAvatar(file: File): Promise<AvatarUploadResponse> {
  const formData = new FormData()
  formData.append('avatar', file)

  const res = await apiClient.put(API_ENDPOINTS.uploadAvatar, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return { avatar: res.data.avatar }
}
