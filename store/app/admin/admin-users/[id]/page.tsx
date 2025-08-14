"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getUserById, updateUser } from "@/services/admin/users/getUsers";
import UserForm from "@/components/admin/users/UserForm";
import { User } from "@/types/admin/users/user";
import { useAuth } from "@/context/AuthContext";

interface PageProps {
  params: { id: string };
}

export default function UserEditPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = params;
  const { permissions: rawPermissions } = useAuth();

  const permissions = useMemo(() => {
    const userPerm = rawPermissions?.find((p) => p.model.code === "user");
    return {
      canEditUser: !!userPerm?.can_update,
    };
  }, [rawPermissions]);

  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!permissions.canEditUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getUserById(id, "admin")
      .then((res) => setUser(res.data))
      .catch(() => setError("خطا در دریافت اطلاعات کاربر"))
      .finally(() => setLoading(false));
  }, [id, permissions]);

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    setError(null);
    try {
      await updateUser(id, data);
      setSuccessMessage("ثبت اطلاعات کاربر با موفقیت انجام شد.");
      setTimeout(() => router.push("/admin/admin-users"), 2500);
    } catch (err) {
      console.error("Update user error:", err);
      setError("خطا در ثبت اطلاعات کاربر");
    } finally {
      setSubmitting(false);
    }
  };

  if (!rawPermissions) return <p className="text-center mt-10">در حال بارگذاری...</p>;
  if (!permissions.canEditUser)
    return <p className="text-center text-red-600 mt-10">دسترسی به این صفحه وجود ندارد.</p>;
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
