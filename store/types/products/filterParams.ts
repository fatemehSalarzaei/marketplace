export interface FilterParams {
  category_slug: string;
  page?: number;
  brands?: number[]; // IDهای برند
  availability_status?: string[]; // ["in_stock", "out_of_stock"]
  price_range?: [number, number]; // [min, max]
  attributes?: Record<string, string[]>; // { color: ["قرمز", "آبی"], storage: ["128", "256"] }
}
