"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AddProductButton } from "@/components/admin/products/AddProductButton";
import FilterForm from "@/components/admin/products/SearchForm";
import ProductTable from "@/components/admin/products/ProductTable";
import { Pagination } from "@/components/admin/products/Pagination";
import DeleteProductModal from "@/components/admin/products/DeleteProductModal";

import {
  fetchProducts,
  deleteProduct,
  Product,
} from "@/services/admin/products/productService";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{
    search?: string;
    status?: string;
    availability?: string;
    category?: string;
  }>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const router = useRouter();
  const pageSize = 10;

  const fetchData = async () => {
    const response = await fetchProducts({
      page: currentPage,
      search: filters.search || "",
      status: filters.status,
      availability: filters.availability,
      category: filters.category,
    });
    setProducts(response.results);
    setTotalCount(response.count);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct.id);
      setSelectedProduct(null);
      fetchData();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">مدیریت محصولات</h1>
        <AddProductButton />
      </div>

      <FilterForm filters={filters} onFilterChange={handleFilterChange} />

      <ProductTable
        products={products}
        onRequestDelete={(id) => {
          const prod = products.find((p) => p.id === id);
          setSelectedProduct(prod || null);
        }}
      />

      <Pagination
        currentPage={currentPage}
        total={totalCount}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />

      {selectedProduct && (
        <DeleteProductModal
          product={selectedProduct}
          onCancel={() => setSelectedProduct(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
