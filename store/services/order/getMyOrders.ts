import apiClient from "@/lib/axiosInstance";
import { PaginatedOrders } from "@/types/order/orders";

export async function getMyOrders(
  page = 1,
  status?: string
): Promise<PaginatedOrders> {
  const params: any = { page };
  if (status) params.status = status;
  const res = await apiClient.get("/orders/my-orders/", { params });
  return res.data;
}
