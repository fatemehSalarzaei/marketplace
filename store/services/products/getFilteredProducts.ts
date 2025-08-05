import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/config";
import { FilterParams } from "@/types/products/filterParams";

export async function getFilteredProducts(
  params: FilterParams & { ordering?: string }
) {
  const query: Record<string, string> = {
    category_slug: params.category_slug,
    page: params.page?.toString() || "1",
  };

  if (params.brand) {
    query["brand"] = Array.isArray(params.brand)
      ? params.brand.join(",")
      : params.brand.toString();
  }

  if (params.availability_status?.length) {
    query["availability_status"] = params.availability_status.join(",");
  }

  if (params.min_price !== undefined) {
    query["min_price"] = params.min_price.toString();
  }
  if (params.max_price !== undefined) {
    query["max_price"] = params.max_price.toString();
  }

  if (params.attribute) {
    const attrParts: string[] = [];
    for (const key in params.attribute) {
      if (params.attribute[key].length) {
        const values = params.attribute[key].join("|");
        attrParts.push(`${key}:${values}`);
      }
    }
    if (attrParts.length) {
      query["attribute"] = attrParts.join(",");
    }
  }

  if (params.ordering) {
    query["ordering"] = params.ordering;
  }

  const queryString = new URLSearchParams(query).toString();
  const url = `${API_ENDPOINTS.getFilteredProducts}?${queryString}`;

  const response = await apiClient.get(url);
  return response.data;
}
