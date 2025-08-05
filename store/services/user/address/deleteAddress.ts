import apiClient from '@/lib/axiosInstance';
import { Address , AddressListResponse , CreateAddressPayload } from '@/types/address/address';
import { API_ENDPOINTS } from '@/lib/config';


export const deleteAddress = (id: number) => {
  return apiClient.delete(`${API_ENDPOINTS.addresses}${id}/`);
};