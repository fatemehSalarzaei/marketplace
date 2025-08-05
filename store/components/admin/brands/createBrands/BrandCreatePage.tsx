"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBrand } from "@/services/admin/brands/brandService";
import BrandForm from "./BrandForm";

export default function BrandCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await createBrand(data);
      router.push("/admin/brands");
    } catch (error) {
      console.error(error);
      alert("خطا در ایجاد برند");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">ایجاد برند جدید</h1>
      <BrandForm loading={loading} onSubmit={handleSubmit} />
    </div>
  );
}
