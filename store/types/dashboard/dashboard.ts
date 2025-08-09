// types/dashboard.ts

export interface ProfileInfo {
  fullName?: string;
  phone?: string;
}

export interface FavoriteProductItem {
  id: number;
  product_id?: number;
  product_name?: string;
  main_image_url?: string | null;
  created_at?: string;
}

export interface FrequentPurchaseItem {
  product_id: number;
  product_name: string;
  count: number;
}

export interface OrdersSummary {
  processing: number;
  delivered: number;
  returned: number;
}

export interface DashboardPayload {
  profile: ProfileInfo;
  ordersSummary: OrdersSummary;
  favorites: FavoriteProductItem[];
  frequentPurchases: FrequentPurchaseItem[];
}
