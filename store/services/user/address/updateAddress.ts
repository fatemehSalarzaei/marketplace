import apiClient from '@/lib/axiosInstance';
import { Address , AddressListResponse , CreateAddressPayload } from '@/types/address/address';
import { API_ENDPOINTS } from '@/lib/config';


export const updateAddress = (id: number, data: Partial<CreateAddressPayload>) => {
  return apiClient.put<Address>(`${API_ENDPOINTS.addresses}${id}/`, data);
};
