import Products from "@/types/products/product_list";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Products[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
