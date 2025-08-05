import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/config";
import { OrderDetail } from "@/types/order/orderDetails";

export const getOrderDetail = async (orderId: string): Promise<OrderDetail> => {
  const { data } = await apiClient.get(`/orders/my-orders/${orderId}/detail/`);
  return data;
};
