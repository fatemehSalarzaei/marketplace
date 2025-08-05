import apiClient from '@/lib/axiosInstance';
import { API_ENDPOINTS_ADMIN } from '@/lib/config';
import { SupportCategory } from '@/types/admin/support/supportCategory';

export const fetchSupportCategories = (
  page = 1,
  filters: { search?: string } = {}
) => {
  const params = new URLSearchParams();

  params.append('page', page.toString());

  if (filters.search) {
    params.append('search', filters.search);
  }

  return apiClient.get(`${API_ENDPOINTS_ADMIN.supportCategories}?${params.toString()}`);
};

export const createSupportCategory = (data: Omit<SupportCategory, 'id'>) => {
  return apiClient.post(API_ENDPOINTS_ADMIN.supportCategories, data);
};

export const updateSupportCategory = (id: number, data: Omit<SupportCategory, 'id'>) => {
  return apiClient.put(`${API_ENDPOINTS_ADMIN.supportCategories}${id}/`, data);
};

export const deleteSupportCategory = (id: number) => {
  return apiClient.delete(`${API_ENDPOINTS_ADMIN.supportCategories}${id}/`);
};
