import apiClient from '@/lib/axiosInstance';
import { Address , AddressListResponse , CreateAddressPayload } from '@/types/address/address';
import { API_ENDPOINTS } from '@/lib/config';

export const getMyAddresses = () => {
  return apiClient.get<AddressListResponse>(API_ENDPOINTS.addresses);
};

