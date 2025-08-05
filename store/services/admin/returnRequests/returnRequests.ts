import apiClient from '@/lib/axiosInstance';  // فایل apiClient شما که ارسال کردید
import { API_ENDPOINTS_ADMIN } from '@/lib/config';
import { IReturnRequestSummary } from '@/types/admin/returnRequests/returnRequests';
import { ReturnRequestDetail } from '@/types/admin/returnRequests/details/returnRequests';
interface GetReturnRequestsParams {
  page?: number;
  status?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const getReturnRequests = async (params: GetReturnRequestsParams = {}, page = 1) => {
  const response = await apiClient.get<PaginatedResponse<IReturnRequestSummary>>(
    `${API_ENDPOINTS_ADMIN.returns_order}`,
    {
      params: { ...params, page }
    }
  );
  return response.data;
};




export const getReturnRequestById = async (id: number) => {
  const res = await apiClient.get<ReturnRequestDetail>(`${API_ENDPOINTS_ADMIN.returns_order}${id}/`)
  return res.data
}

export const updateReturnRequestStatus = async (id: number, status: string) => {
  const res = await apiClient.patch(`${API_ENDPOINTS_ADMIN.returns_order}${id}/`, { status })
  return res.data
}