import apiClient from '@/lib/axiosInstance';
import { API_ENDPOINTS_ADMIN } from '@/lib/config';
import { Banner, BannerPaginatedResponse, BannerCreateData, BannerUpdateData } from '@/types/admin/banner/banner';

interface GetBannersParams {
  search?: string;
  page?: number;
  pageSize?: number;
}

export const getBanners = async (params?: GetBannersParams): Promise<BannerPaginatedResponse> => {
  const response = await apiClient.get<BannerPaginatedResponse>(API_ENDPOINTS_ADMIN.banners, {
    params: {
      search: params?.search,
      page: params?.page,
      page_size: params?.pageSize,
    },
  });

  return {
    ...response.data,
    results: Array.isArray(response.data.results) ? response.data.results : [],
  };
};


export const createBanner = async (data: BannerCreateData): Promise<Banner> => {
  const response = await apiClient.post<Banner>(API_ENDPOINTS_ADMIN.banners, data);
  return response.data;
};

export const updateBanner = async (id: number, data: BannerUpdateData): Promise<Banner> => {
  const url = `${API_ENDPOINTS_ADMIN.banners}${id}/`;
  const response = await apiClient.put<Banner>(url, data);
  return response.data;
};

export const deleteBanner = async (id: number): Promise<void> => {
  const url = `${API_ENDPOINTS_ADMIN.banners}${id}/`;
  await apiClient.delete(url);
};
