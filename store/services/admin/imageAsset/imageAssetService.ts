import apiClient from '@/lib/axiosInstance';
import { API_ENDPOINTS_ADMIN } from '@/lib/config';
import { ImageAssetPaginatedResponse } from '@/types/admin/imageAsset/imageAsset';

export interface ImageAsset {
  id: string;
  url: string;
  name: string;
  // سایر فیلدها در صورت وجود
}

export interface ImageAssetPaginatedResponse {
  count: number;
  results: ImageAsset[];
}

interface GetImagesParams {
  search?: string;
  page?: number;
  pageSize?: number;
}

export const getImages = async (params?: GetImagesParams): Promise<ImageAssetPaginatedResponse> => {
  const queryParams: Record<string, any> = {};

  if (params?.search) queryParams.search = params.search;
  if (params?.page) queryParams.page = params.page;
  if (params?.pageSize) queryParams.page_size = params.pageSize;

  const response = await apiClient.get(API_ENDPOINTS_ADMIN.imageAssets, {
    params: queryParams,
  });

  return response.data;
};

export const addImage = async (formData: FormData) => {
  const response = await apiClient.post(API_ENDPOINTS_ADMIN.imageAssets, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteImage = async (id: number) => {
  await apiClient.delete(`${API_ENDPOINTS_ADMIN.imageAssets}${id}/`);
};
