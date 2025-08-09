// types/recentViews.ts
export interface RecentView {
  id: number;
  product_id: number;
  product_name: string;
  main_image_url: string;
  viewed_at: string; // ISO date string
}

export type RecentViewsList = RecentView[];
