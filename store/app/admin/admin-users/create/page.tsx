"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import UserForm from "@/components/admin/users/UserForm";
import { createUser } from "@/services/admin/users/getUsers";

export default function UserCreatePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    setError(null);
    try {
      await createUser(data);
      setSuccessMessage("کاربر جدید با موفقیت ایجاد شد.");
      // بعد از ۲.۵ ثانیه ریدایرکت شود
      setTimeout(() => {
        router.push("/admin/admin-users");
      }, 2500);
    } catch (err) {
      console.error("Create user error:", err);
      setError("خطا در ثبت اطلاعات کاربر");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded font-iranyekan shadow">
      <h1 className="text-2xl font-bold mb-6">ایجاد کاربر جدید</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}
      {successMessage && (
        <p className="mb-4 text-green-600 font-semibold">{successMessage}</p>
      )}

      <UserForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
}
