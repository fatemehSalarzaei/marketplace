"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import RoleForm from "@/components/admin/roles/RoleForm";
import { getRole } from "@/services/admin/roles/roleService";

export default function EditRolePage() {
  const router = useRouter();
  const params = useParams();
  const roleId = Number(params.id);

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roleId) return;

    setLoading(true);
    getRole(roleId)
      .then((res) => {
        setInitialData({
          name: res.data.name,
          permissions: res.data.model_permissions,
        });
      })
      .catch((error) => {
        console.error("خطا در دریافت نقش:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [roleId]);

  const handleSuccess = () => {
    alert("ویرایش نقش با موفقیت انجام شد.");
    router.push("/admin/roles");
  };

  if (loading) {
    return <p>در حال بارگذاری اطلاعات نقش...</p>;
  }

  if (!initialData) {
    return <p>نقش مورد نظر یافت نشد.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">ویرایش نقش</h1>
      <RoleForm
        initialData={initialData}
        isEdit={true}
        roleId={roleId}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
