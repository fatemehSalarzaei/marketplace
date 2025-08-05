import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/config";
import { AddToCartPayload } from "@/types/cart/addToCart";

export const addToCart = async (payload: AddToCartPayload): Promise<any> => {
  const response = await axiosInstance.post(API_ENDPOINTS.cart, payload);
  return response; // کل response را برمی‌گردانیم
};

export const removeFromCart = async (variantId: number): Promise<any> => {
  const response = await axiosInstance.post(API_ENDPOINTS.cart, {
    variant_id: variantId,
    quantity: 0,
  });
  return response; // کل response را برمی‌گردانیم
};
