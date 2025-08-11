export interface Element {
  id: number;
  name: string;
  display_title?: string;
  element_type: string; // مثلا "product", "category"
  position: number;
  display_style: string;
  section: string;
  is_active: boolean;
  start_at?: string;
  end_at?: string;
  html_content?: string;
}

export interface ElementItem {
  id: number;
  element: number;
  title?: string;
  position: number;
  object_id?: number;
  extra_data?: Record<string, any>;
  is_active: boolean;
}

export interface RelatedObject {
  id: number;
  name: string;
}

export interface ElementType {
  id: number;
  name: string;
  content_type?: string;  // مدل مرتبط به صورت نام مدل
}
