type Products = {
  id: number;
  name: string;
  slug: string;
  main_image_url: string;
  short_description: string;
  price: string;
  availability_status: "in_stock" | "out_of_stock";
  min_price: string;
  max_price: string;
  total_sales: number;
  popularity: number;
};

export default Products;
