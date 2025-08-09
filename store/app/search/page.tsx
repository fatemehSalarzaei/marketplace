"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getFilteredProducts } from "@/services/products/getFilteredProducts";
import ProductGrid from "@/components/products/ProductGrid";
import Products from "@/types/products/product_list";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getFilteredProducts({ search: searchQuery,page: 1 });
        setProducts(data.results || []);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        جستجو برای: «{searchQuery}»
      </h1>

      {loading && <p>در حال بارگذاری...</p>}

      {!loading && products.length === 0 && (
        <p className="text-gray-500">هیچ محصولی با این عبارت یافت نشد.</p>
      )}

      {!loading && products.length > 0 && <ProductGrid products={products} />}
    </div>
  );
}
