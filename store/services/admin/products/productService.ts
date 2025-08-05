// services/products/fetchProducts.ts
import apiClient from '@/lib/axiosInstance';
import { API_ENDPOINTS_ADMIN } from '@/lib/config';

export interface Product {
  id: string;
  name: string;
  price: number;
  slug: string;
  category?: { id: string; name: string };
  status?: string;
  availability?: string;
  // سایر فیلدهای مورد نیاز
}

export interface ProductResponse {
  count: number;
  results: Product[];
}

interface FetchProductsParams {
  query?: string;
  page?: number;
  pageSize?: number;
  status?: string;
  availability?: string;
  category?: string;
}
export async function fetchProducts(params: {
  page?: number;
  search?: string;
  status?: string;
  availability?: string;
  category?: string;
}) {
  // ساخت آبجکت پارامترهای نهایی فقط با کلیدهایی که مقدار غیر تهی دارند
  const filteredParams: Record<string, any> = {};

  if (params.page !== undefined) filteredParams.page = params.page;
  if (params.search && params.search.trim() !== "") filteredParams.search = params.search.trim();
  if (params.status && params.status.trim() !== "") filteredParams.status = params.status.trim();
  if (params.availability && params.availability.trim() !== "") filteredParams.availability = params.availability.trim();
  if (params.category && params.category.trim() !== "") filteredParams.category_slug = params.category.trim();

  console.log("Sending params:", filteredParams);

  const res = await apiClient.get(API_ENDPOINTS_ADMIN.getFilteredProducts, { params: filteredParams });
  return res.data;
}

export const deleteProduct = async (productId: string): Promise<boolean> => {
  try {
    await apiClient.delete(`${API_ENDPOINTS_ADMIN.getFilteredProducts}${productId}/`);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};
