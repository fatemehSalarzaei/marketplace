"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "@/types/admin/brands/brand";
import { getBrands, deleteBrand } from "@/services/admin/brands/brandService";
import BrandTable from "./BrandTable";
import BrandFilters from "./BrandFilters";
import DeleteBrandModal from "./DeleteBrandModal";
import { useAuth } from "@/context/AuthContext";

export default function BrandList() {
  const { hasPermission } = useAuth();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<{ search: string; is_active?: string }>({
    search: "",
    is_active: "",
  });
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const router = useRouter();

  const fetchData = async (page = 1, activeFilters = filters) => {
    if (!hasPermission("brand", "read")) return;
    setLoading(true);
    try {
      const response = await getBrands({ page, ...activeFilters });
      setBrands(response.results || []);
      setTotalPages(Math.ceil((response.count || 0) / 10));
    } catch (error) {
      console.error("خطا در دریافت برندها:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage, filters);
  }, [currentPage, filters, hasPermission]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    fetchData(1, newFilters);
  };

  const handleDelete = async () => {
    if (selectedBrand && hasPermission("brand", "delete")) {
      await deleteBrand(selectedBrand.id);
      setSelectedBrand(null);
      fetchData(currentPage, filters);
    }
  };

  if (!hasPermission("brand", "read")) {
    return <p>شما دسترسی مشاهده برندها را ندارید.</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">برندها</h1>
        {hasPermission("brand", "create") && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={() => router.push("/admin/brands/create")}
          >
            برند جدید
          </button>
        )}
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
          onRequestDelete={(id) => {
            if (hasPermission("brand", "delete")) {
              setSelectedBrand(brands.find((b) => b.id === id) || null);
            }
          }}
          hasPermission={hasPermission}
        />
      )}

      {selectedBrand && hasPermission("brand", "delete") && (
        <DeleteBrandModal
          brand={selectedBrand}
          onCancel={() => setSelectedBrand(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
