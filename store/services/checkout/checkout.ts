import apiClient from "@/lib/axiosInstance";
import { ShippingMethod } from "@/types/checkout/checkout";
import { API_ENDPOINTS } from "@/lib/config";

export async function getShippingMethods(): Promise<ShippingMethod[]> {
  const res = await apiClient.get(API_ENDPOINTS.shipping);
  return res.data.results;
}
