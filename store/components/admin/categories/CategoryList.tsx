"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/types/admin/categories/category";
import { getCategories, deleteCategory } from "@/services/admin/categories/categoryService";
import CategoryFilters from "./CategoryFilters";
import CategoryTable from "./CategoryTable";
import Pagination from "./Pagination";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { useAuth } from "@/context/AuthContext";

export default function CategoryList() {
  const { hasPermission } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<{ search?: string; is_active?: string }>({});
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const router = useRouter();

  const fetchData = async (page = 1, activeFilters = filters) => {
    if (!hasPermission("category", "read")) return; // check read permission
    setLoading(true);
    try {
      const response = await getCategories({ page, ...activeFilters });
      setCategories(response.results || []);
      setTotalPages(Math.ceil((response.count || 0) / 10));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, filters);
  }, [currentPage, filters, hasPermission]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    if (selectedCategory && hasPermission("category", "delete")) {
      await deleteCategory(selectedCategory.id);
      setSelectedCategory(null);
      fetchData(currentPage, filters);
    }
  };

  if (!hasPermission("category", "read")) {
    return <p>شما اجازه مشاهده دسته‌بندی‌ها را ندارید.</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">دسته‌بندی‌ها</h1>
        {hasPermission("category", "create") && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={() => router.push("/admin/categories/create")}
          >
            دسته جدید
          </button>
        )}
      </div>

      <CategoryFilters onFilterChange={handleFilterChange} />

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <CategoryTable
          categories={categories}
          page={currentPage}
          totalCount={totalPages * 10}
          onPageChange={(page) => setCurrentPage(page)}
          onRequestDelete={(id) => {
            if (hasPermission("category", "delete")) {
              setSelectedCategory(categories.find((cat) => cat.id === id) || null);
            }
          }}
        />
      )}

      {selectedCategory && hasPermission("category", "delete") && (
        <DeleteCategoryModal
          category={selectedCategory}
          onCancel={() => setSelectedCategory(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
