export interface SupportCategory {
  id: number;
  name: string;
  description: string;
}

export interface PaginatedSupportCategory {
  count: number;
  next: string | null;
  previous: string | null;
  results: SupportCategory[];
}