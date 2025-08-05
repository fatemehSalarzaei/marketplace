import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/config";
import type { CreateOrderPayload } from "@/types/order/createOrder";

export const createOrder = async (payload: CreateOrderPayload) => {
  const response = await apiClient.post(API_ENDPOINTS.createOrder, payload);
  return response.data;
};
