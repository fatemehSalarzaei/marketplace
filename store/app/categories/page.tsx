// app/categories/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchCategoriesTree } from "@/services/categories/getCategories";
import { Category } from "@/types/category/getCategories";
import CategoryCard from "@/components/categories/CategoryCard";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategoriesTree();
        setCategories(data);
      } catch (error) {
        console.error("خطا در دریافت دسته‌بندی‌ها:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">دسته‌بندی‌های محصولات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
