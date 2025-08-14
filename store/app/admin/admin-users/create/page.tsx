"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import UserForm from "@/components/admin/users/UserForm";
import { createUser } from "@/services/admin/users/getUsers";
import { useAuth } from "@/context/AuthContext";

export default function UserCreatePage() {
  const router = useRouter();
  const { permissions: rawPermissions } = useAuth();

  // محاسبه دسترسی‌ها
  const permissions = useMemo(() => {
    const userPerm = rawPermissions?.find((p) => p.model.code === "user");
    return {
      canCreateUser: !!userPerm?.can_create,
    };
  }, [rawPermissions]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    setError(null);
    try {
      await createUser(data);
      setSuccessMessage("کاربر جدید با موفقیت ایجاد شد.");
      setTimeout(() => router.push("/admin/admin-users"), 2500);
    } catch (err) {
      console.error("Create user error:", err);
      setError("خطا در ثبت اطلاعات کاربر");
    } finally {
      setSubmitting(false);
    }
  };

  if (!rawPermissions) return <p className="text-center mt-10">در حال بارگذاری...</p>;
  if (!permissions.canCreateUser)
    return <p className="text-center text-red-600 mt-10">دسترسی به این صفحه وجود ندارد.</p>;

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
