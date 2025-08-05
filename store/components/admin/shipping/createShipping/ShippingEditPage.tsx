"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getShippingMethodById, updateShippingMethod } from "@/services/admin/shipping/shippingService";
import ShippingForm from "./ShippingForm";

interface ShippingEditProps {
  shippingId: number;
  onSuccess?: () => void;
}

export default function ShippingEdit({ shippingId, onSuccess }: ShippingEditProps) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getShippingMethodById(shippingId);
        setData(res);
      } catch (err) {
        alert("خطا در دریافت اطلاعات روش ارسال");
      } finally {
        setLoadingInitial(false);
      }
    };
    fetchData();
  }, [shippingId]);

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    try {
      await updateShippingMethod(shippingId, formData);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/admin/shipping-methods");
      }
    } catch (err) {
      alert("خطا در بروزرسانی روش ارسال");
    } finally {
      setLoading(false);
    }
  };

  if (loadingInitial) return <p className="p-4">در حال بارگذاری...</p>;

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">ویرایش روش ارسال</h1>
      <ShippingForm initialData={data} loading={loading} onSubmit={handleSubmit} />
    </div>
  );
}
