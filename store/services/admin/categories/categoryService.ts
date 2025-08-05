import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS_ADMIN } from "@/lib/config";
import { Category } from "@/types/category/getCategories";

interface PaginatedCategoryResponse {
  results: Category[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const getCategories = async (
  params?: any
): Promise<PaginatedCategoryResponse> => {
  const res = await apiClient.get(API_ENDPOINTS_ADMIN.categories, { params });
  return res.data;
};

export const deleteCategory = async (id: number) => {
  return await apiClient.delete(`${API_ENDPOINTS_ADMIN.categories}${id}/`);
};

// متد جدید برای گرفتن همه دسته‌ها بدون صفحه‌بندی
export const getAllCategories = async (): Promise<Category[]> => {
  const res = await apiClient.get(API_ENDPOINTS_ADMIN.categories_all);
  return res.data;
};
