export interface Category {
  id: number;
  name: string;
  slug: string;
  parent?: {
    id: number;
    name: string;
  } | null;
  is_active: boolean;
  created_at: string;
}

export interface Create_Category {
  id?: number;
  name: string;
  parent_id?: number | null;
  description?: string;
  image?: string;
  icon?: string;
  is_active: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
  parent?: Category | null;
}
