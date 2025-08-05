export interface ElementItemObject {
  id: number;
  title?: string;
  extra_data?: Record<string, any>;
  object: any; // بسته به نوع می‌تواند Product یا Category یا Banner باشد
}

export interface Element {
  id: number;
  name: string;
  display_title?: string;
  element_type: string;
  display_style: string;
  section: "header" | "middle" | "footer";
  html_content?: string;
  items: ElementItemObject[];
}
