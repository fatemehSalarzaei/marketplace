export interface VideoAsset {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  video: string;
  uploaded_at: string;
}

export interface VideoAssetPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: VideoAsset[];
}
