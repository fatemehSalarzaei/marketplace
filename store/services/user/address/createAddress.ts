import apiClient from '@/lib/axiosInstance';
import { Address , AddressListResponse , CreateAddressPayload } from '@/types/address/address';
import { API_ENDPOINTS } from '@/lib/config';


export const createAddress = (data: CreateAddressPayload) => {
  return apiClient.post<Address>(API_ENDPOINTS.addresses, data);
};

