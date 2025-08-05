import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS_ADMIN } from "@/lib/config";

export async function getCategoryById(id: number) {
  const response = await apiClient.get(
    `${API_ENDPOINTS_ADMIN.categories}${id}/`
  );
  return response.data;
}

export async function updateCategory(id: number, data: FormData) {
  const response = await apiClient.put(
    `${API_ENDPOINTS_ADMIN.categories}${id}/`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
}
