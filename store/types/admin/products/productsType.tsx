export interface Product {
  id: string;
  name: string;
  product_code: string;
  price: number;
  status: string;
  availability_status: string;
  main_image: string;
}

export interface ProductResponse {
  data: Product[];
  total_count: number;
}
