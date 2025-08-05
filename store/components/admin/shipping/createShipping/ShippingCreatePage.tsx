// components/admin/shipping/CreateShippingMethod.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createShippingMethod } from "@/services/admin/shipping/shippingService";
import ShippingForm from "./ShippingForm";

export default function CreateShippingMethod() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await createShippingMethod(data);
      router.push("/admin/shipping-methods");
    } catch (err) {
      alert("خطا در ایجاد روش ارسال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">ایجاد روش جدید</h1>
      <ShippingForm loading={loading} onSubmit={handleSubmit} />
    </div>
  );
}
