import apiClient from "@/lib/axiosInstance";
import Products from "@/types/products/product_list";
import { API_ENDPOINTS } from "@/lib/config";

export const getCategoryProducts = async (
  slug: string,
  page = 1
): Promise<{ results: Products[]; next: string | null }> => {
  const res = await apiClient.get(
    API_ENDPOINTS.getCategoryProducts(slug, page)
  );
  return res.data;
};
