"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "@/types/admin/brands/brand";
import { getBrands, deleteBrand } from "@/services/admin/brands/brandService";
import BrandTable from "./BrandTable";
import BrandFilters from "./BrandFilters";
import DeleteBrandModal from "./DeleteBrandModal";

export default function BrandList() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<{
    search: string;
    is_active?: string;
  }>({
    search: "",
    is_active: "",
  });
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const router = useRouter();

  const fetchData = async (page = 1, activeFilters = filters) => {
    setLoading(true);
    try {
      const response = await getBrands({ page, ...activeFilters });
      setBrands(response.results || []);
      setTotalPages(Math.ceil(response.count / 10));
    } catch (error) {
      console.error("خطا در دریافت برندها:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    fetchData(1, newFilters);
  };

  const handleDelete = async () => {
    if (selectedBrand) {
      await deleteBrand(selectedBrand.id);
      setSelectedBrand(null);
      fetchData(currentPage, filters);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">برندها</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={() => router.push("/admin/brands/create")}
        >
          برند جدید
        </button>
      </div>

      <BrandFilters onFilterChange={handleFilterChange} />

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <BrandTable
          brands={brands}
          page={currentPage}
          totalCount={totalPages * 10}
          onPageChange={(page) => setCurrentPage(page)}
          onRequestDelete={(id) =>
            setSelectedBrand(brands.find((b) => b.id === id) || null)
          }
        />
      )}

      {selectedBrand && (
        <DeleteBrandModal
          brand={selectedBrand}
          onCancel={() => setSelectedBrand(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
