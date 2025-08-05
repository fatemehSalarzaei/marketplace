import apiClient from "@/lib/axiosInstance";
import { Element } from "@/types/pageBuilder/pageBuilder";
import { API_ENDPOINTS } from "@/lib/config";

export const fetchHomeElements = async (): Promise<Element[]> => {
  const response = await apiClient.get<Element[]>(API_ENDPOINTS.home, {});
  return response.data;
};
