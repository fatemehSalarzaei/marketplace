import apiClient from "@/lib/axiosInstance";
import { Product } from "@/types/products/product";
import { API_ENDPOINTS } from "@/lib/config";

export const getProductById = async (id: string): Promise<Product> => {
  const res = await apiClient.get<Product>(API_ENDPOINTS.getProductById(id));
  return res.data;
};
