"use client";

import CategoryForm from "./CategoryForm";
import { createCategory } from "@/services/admin/categories/createCategory";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CategoryCreatePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await createCategory(data);
      router.push("/admin/categories");
    } catch (error) {
      console.error(error);
      alert("خطا در ایجاد دسته‌بندی");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">ایجاد دسته بندی</h1>
      <CategoryForm loading={loading} onSubmit={handleSubmit} />
    </div>
  );
};

export default CategoryCreatePage;
