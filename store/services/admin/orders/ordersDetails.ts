import apiClient from '@/lib/axiosInstance';
import { API_ENDPOINTS_ADMIN } from '@/lib/config';
import { Order } from '@/types/admin/orders/ordersDetails';

export const getAdminOrderById = async (id: number): Promise<Order> => {
  const response = await apiClient.get(`${API_ENDPOINTS_ADMIN.orders}${id}/`);
  return response.data;
};



export const updateOrderStatus = async (orderId: number, data: any): Promise<void> => {
  await apiClient.put(`${API_ENDPOINTS_ADMIN.change_order}${orderId}`, data);
};