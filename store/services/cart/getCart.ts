// services/cart/getCart.ts

import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/config";
import { Cart } from "@/types/cart/cart";

export const getCart = async (): Promise<Cart> => {
  const response = await apiClient.get(API_ENDPOINTS.cart);
  return response.data;
};
