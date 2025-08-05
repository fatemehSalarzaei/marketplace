import ProductDetail from "@/components/product/ProductDetail";
import { getProductById } from "@/services/products/productService";
import { Product } from "@/types/products/product";
interface Props {
  params: { id: string };
}

const ProductPage = async ({ params }: Props) => {
  const product: Product = await getProductById(params.id);
  return (
    <main className="container mx-auto py-6">
      <ProductDetail product={product} />
    </main>
  );
};

export default ProductPage;
