import apiClient from "@/lib/axiosInstance";
import { CategoryBreadcrumb } from "@/types/category/category";

export async function getCategoryAncestors(
  slug: string
): Promise<CategoryBreadcrumb> {
  const url = `/categories/categories/ancestors/${slug}/`;
  const response = await apiClient.get(url);
  return response.data;
}
