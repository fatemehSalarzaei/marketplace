import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS_ADMIN } from "@/lib/config";

export const createCategory = async (data: FormData) => {
  const res = await apiClient.post(API_ENDPOINTS_ADMIN.categories, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
