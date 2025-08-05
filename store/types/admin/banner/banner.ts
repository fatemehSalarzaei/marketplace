export type BannerType = 'slider' | 'static';

export interface Banner {
  id: number;
  title: string;
  image: string;
  url: string;
  banner_type: BannerType;
  position: number;
  is_active: boolean;
  start_at: string;
  end_at: string;
}

export interface BannerPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Banner[];
}
