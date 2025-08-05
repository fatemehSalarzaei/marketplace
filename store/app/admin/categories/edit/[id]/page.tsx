"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CategoryForm from "@/components/admin/categories/createCategories/CategoryForm";
import {
  getCategoryById,
  updateCategory,
} from "@/services/admin/categories/updateCategory";
import { Create_Category } from "@/types/admin/categories/category";

const EditCategoryPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<Partial<Create_Category>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCategoryById(Number(id));
        setInitialData(data);
      } catch (err) {
        console.error("خطا در دریافت اطلاعات دسته", err);
      }
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await updateCategory(Number(id), formData);
      router.push("/admin/categories");
    } catch (err) {
      console.error("خطا در ویرایش دسته", err);
      alert("خطا در ویرایش دسته‌بندی");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">ویرایش دسته‌بندی</h1>
      <CategoryForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default EditCategoryPage;
