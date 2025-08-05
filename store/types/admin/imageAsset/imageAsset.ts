export interface ImageAsset {
  id: number;
  title: string;
  short_description?: string;
  long_description?: string;
  image: string;
  uploaded_at: string;
}

export interface ImageAssetPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ImageAsset[];
}
