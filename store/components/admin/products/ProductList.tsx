"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProducts, Product } from "@/services/products/fetchProducts";
import ProductTable from "./ProductTable";
import DeleteProductModal from "./DeleteProductModal";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const router = useRouter();

  const getData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetchProducts("", page);
      setProducts(res.results);
      setTotalCount(res.count);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handleDelete = async () => {
    if (selectedProduct) {
      // فرض بر اینه deleteProduct سرویس حذف محصول هست
      await deleteProduct(selectedProduct.id);
      setSelectedProduct(null);
      getData(currentPage);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">لیست محصولات</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={() => router.push("/admin/products/create")}
        >
          افزودن محصول
        </button>
      </div>

     
