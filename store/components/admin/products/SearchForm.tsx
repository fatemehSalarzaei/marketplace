"use client";

import { useState, useEffect } from "react";
import { getAllCategories } from "@/services/admin/categories/categoryService";
import { Category } from "@/types/category/getCategories";

interface Props {
  filters: { search?: string; status?: string; availability?: string; category?: string };
  onFilterChange: (filters: Props["filters"]) => void;
}

const STATUS_OPTIONS = [
  { value: "", label: "همه" },
  { value: "draft", label: "پیش‌نویس" },
  { value: "published", label: "منتشر شده" },
];

const AVAILABILITY_OPTIONS = [
  { value: "", label: "همه" },
  { value: "in_stock", label: "موجود" },
  { value: "out_of_stock", label: "ناموجود" },
  { value: "pre_order", label: "پیش‌فروش" },
];

export const FilterForm: React.FC<Props> = ({ filters, onFilterChange }) => {
  const [search, setSearch] = useState(filters.search || "");
  const [status, setStatus] = useState(filters.status || "");
  const [availability, setAvailability] = useState(filters.availability || "");
  const [category, setCategory] = useState(filters.category || "");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ search, status, availability, category });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
      <div>
        <label className="block text-sm">جستجو</label>
        <input
          className="border px-3 py-2 w-full rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="نام یا کد محصول"
        />
      </div>

      <div>
        <label className="block text-sm">وضعیت</label>
        <select
          className="border px-3 py-2 w-full rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUS_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm">موجودی</label>
        <select
          className="border px-3 py-2 w-full rounded"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          {AVAILABILITY_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm">دسته‌بندی</label>
        <select
          className="border px-3 py-2 w-full rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">همه</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
        اعمال فیلتر
      </button>
    </form>
  );
};

export default FilterForm;
