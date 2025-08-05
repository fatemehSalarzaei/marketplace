import apiClient from "@/lib/axiosInstance";
import { FilterOption } from "@/types/category/categoryFilter";

export const getCategoryFilters = async (
  slug: string
): Promise<FilterOption[]> => {
  const response = await apiClient.get(
    `/categories/categories/${slug}/filters/`
  );
  return response.data;
};
