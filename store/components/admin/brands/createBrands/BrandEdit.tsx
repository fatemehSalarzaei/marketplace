"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getBrandById,
  updateBrand,
} from "@/services/admin/brands/brandService";
import BrandForm from "./BrandForm";
import { Brand } from "@/types/admin/brands/brand";

export default function BrandEdit() {
  const { id } = useParams();
  const router = useRouter();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const data = await getBrandById(Number(id));
        setBrand(data);
      } catch (error) {
        console.error("خطا در دریافت برند", error);
        alert("خطا در دریافت اطلاعات برند");
      } finally {
        setLoadingInitial(false);
      }
    };

    fetchBrand();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await updateBrand(Number(id), formData);
      router.push("/admin/brands");
    } catch (error) {
      console.error(error);
      alert("خطا در به‌روزرسانی برند");
    } finally {
      setLoading(false);
    }
  };

  if (loadingInitial) return <p className="p-4">در حال بارگذاری...</p>;

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">ویرایش برند</h1>
      {brand && (
        <BrandForm
          initialData={brand}
          loading={loading}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
