import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS_ADMIN } from "@/lib/config";

export async function getShippingMethods(params) {
  const response = await apiClient.get(API_ENDPOINTS_ADMIN.shipping_methods, { params });
  return response.data;
}

export async function getShippingMethodById(id) {
  const response = await apiClient.get(`${API_ENDPOINTS_ADMIN.shipping_methods}${id}/`);
  return response.data;
}

export async function createShippingMethod(data) {
  const response = await apiClient.post(API_ENDPOINTS_ADMIN.shipping_methods, data);
  return response.data;
}

export async function updateShippingMethod(id, data) {
  const response = await apiClient.put(`${API_ENDPOINTS_ADMIN.shipping_methods}${id}/`, data);
  return response.data;
}

export async function deleteShippingMethod(id) {
  await apiClient.delete(`${API_ENDPOINTS_ADMIN.shipping_methods}${id}/`);
}
