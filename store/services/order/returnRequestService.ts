import apiClient from "@/lib/axiosInstance";

export interface ReturnRequestData {
  order: number; // آی‌دی سفارش
  order_item: number; // آی‌دی آیتم سفارش
  reason: string; // دلیل بازگشت
}

export const createReturnRequest = async (data: ReturnRequestData) => {
  const response = await apiClient.post("/orders/return-request/", data);
  return response.data;
};
