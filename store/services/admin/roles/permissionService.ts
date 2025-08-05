import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS_ADMIN } from "@/lib/config";

export async function getModelAccessPermissions() {
  return apiClient.get(API_ENDPOINTS_ADMIN.permissions);
}
