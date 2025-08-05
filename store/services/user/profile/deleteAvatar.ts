import apiClient from '@/lib/axiosInstance'

export async function deleteAvatar() {
  const res = await apiClient.delete('http://127.0.0.1:8000/api/v1/accounts/profile/avatar/')
  return res.data
}
