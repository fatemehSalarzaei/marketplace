import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS_ADMIN } from "@/lib/config";
import { VideoAsset, VideoAssetPaginatedResponse } from "@/types/admin/videoAsset/videoAsset";

interface GetVideosParams {
  search?: string;
  page?: number;
  pageSize?: number;
  // اگر فیلترهای دیگری هم نیاز داری، اینجا اضافه کن
}

export const getVideos = async (params?: GetVideosParams): Promise<VideoAssetPaginatedResponse> => {
  const response = await apiClient.get(API_ENDPOINTS_ADMIN.videoAssets, {
    params: {
      search: params?.search,
      page: params?.page,
      page_size: params?.pageSize,
    },
  });
  return response.data;
};


export const addVideo = async (formData: FormData): Promise<VideoAsset> => {
  const response = await apiClient.post(API_ENDPOINTS_ADMIN.videoAssets, formData);
  return response.data;
};

export const deleteVideo = async (id: number): Promise<void> => {
  await apiClient.delete(`${API_ENDPOINTS_ADMIN.videoAssets}${id}/`);
};
