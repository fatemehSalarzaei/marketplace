import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS_ADMIN } from "@/lib/config";
import { Brand } from "@/types/admin/brands/brand";

interface GetBrandsParams {
  page?: number;
  search?: string;
  is_active?: string;
}

// لیست برندها با فیلتر
export async function getBrands(params: GetBrandsParams) {
  const response = await apiClient.get(API_ENDPOINTS_ADMIN.brands, {
    params,
  });
  return response.data;
}

export async function getBrandById(id: number): Promise<Brand> {
  const response = await apiClient.get(`${API_ENDPOINTS_ADMIN.brands}${id}/`);
  return response.data;
}

export async function createBrand(data: FormData): Promise<Brand> {
  const response = await apiClient.post(API_ENDPOINTS_ADMIN.brands, data);
  return response.data;
}

export async function updateBrand(id: number, data: FormData): Promise<Brand> {
  const response = await apiClient.put(
    `${API_ENDPOINTS_ADMIN.brands}${id}/`,
    data
  );
  return response.data;
}

export async function deleteBrand(id: number): Promise<void> {
  await apiClient.delete(`${API_ENDPOINTS_ADMIN.brands}${id}/`);
}
