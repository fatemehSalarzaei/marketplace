import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS_ADMIN } from "@/lib/config";
import { Attribute, AttributeGroup, AttributeValue } from "@/types/admin/attribute/attribute";

interface AttributeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Attribute[];
}

export const getAttributes = (page?: number, search?: string) => {
  const params: Record<string, any> = {};
  if (page) params.page = page;
  if (search) params.search = search;
  return apiClient.get<AttributeResponse>(API_ENDPOINTS_ADMIN.attributes, { params });
};



export const createAttribute = (data: Partial<Attribute>) =>
  apiClient.post(API_ENDPOINTS_ADMIN.attributes, data);

export const getAttributeById = (id: number) =>
  apiClient.get<Attribute>(`${API_ENDPOINTS_ADMIN.attributes}${id}/`);

export const updateAttribute = (id: number, data: Partial<Attribute>) =>
  apiClient.put(`${API_ENDPOINTS_ADMIN.attributes}${id}/`, data);

interface AttributeGroupResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AttributeGroup[];
}

export const getAttributeGroups = (page?: number, search?: string) => {
  const params: Record<string, any> = {};
  if (page) params.page = page;
  if (search && search.trim() !== "") params.search = search.trim();

  return apiClient.get<AttributeGroupResponse>(API_ENDPOINTS_ADMIN.attributeGroups, { params });
};
export const createAttributeGroup = (data: Partial<AttributeGroup>) =>
  apiClient.post(API_ENDPOINTS_ADMIN.attributeGroups, data);

export const updateAttributeGroup = (id: number, data: Partial<AttributeGroup>) =>
  apiClient.put(`${API_ENDPOINTS_ADMIN.attributeGroups}${id}/`, data);

export const getAttributeValues = (attributeId?: number) =>
  apiClient.get<AttributeValue[]>(
    API_ENDPOINTS_ADMIN.attributeValues,
    {
      params: attributeId ? { attribute: attributeId } : {},
    }
  );

export const createAttributeValue = (data: Partial<AttributeValue>) =>
  apiClient.post(API_ENDPOINTS_ADMIN.attributeValues, data);

export const updateAttributeValue = (id: number, data: Partial<AttributeValue>) =>
  apiClient.put(`${API_ENDPOINTS_ADMIN.attributeValues}${id}/`, data);

export const deleteAttributeValue = (id: number) =>
  apiClient.delete(`${API_ENDPOINTS_ADMIN.attributeValues}${id}/`);

export const deleteAttributeGroup = (id: number) =>
  apiClient.delete(`${API_ENDPOINTS_ADMIN.attributeGroups}${id}/`);


export const getAllAttributes = () => {
  return apiClient.get<Attribute[]>(API_ENDPOINTS_ADMIN.attributes_all);
};

export const getProductAttributes = () => {
  return apiClient.get<Attribute[]>(API_ENDPOINTS_ADMIN.product_attributes);
};

export const getVariantAttributes = () => {
  return apiClient.get<Attribute[]>(API_ENDPOINTS_ADMIN.variant_attributes);
};
