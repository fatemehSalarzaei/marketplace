"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { getUserById, updateUser } from "@/services/admin/users/getUsers";
import UserForm from "@/components/admin/users/UserForm";
import { User } from "@/types/admin/users/user";

interface PageProps {
  params: { id: string };
}

export default function UserEditPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = params;

  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getUserById(id, "admin")
      .then((res) => setUser(res.data))
      .catch(() => setError("خطا در دریافت اطلاعات کاربر"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    setError(null);
    try {
      await updateUser(id, data);
      setSuccessMessage("ثبت اطلاعات کاربر با موفقیت انجام شد.");
      // بعد از 2.5 ثانیه ریدایرکت کن
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

  if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-white rounded font-iranyekan shadow">
      <h1 className="text-2xl font-bold mb-6">
        ویرایش کاربر: {user?.first_name} {user?.last_name}
      </h1>

      {successMessage && (
        <p className="mb-4 text-green-600 font-semibold">{successMessage}</p>
      )}

      <UserForm user={user} onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
}
