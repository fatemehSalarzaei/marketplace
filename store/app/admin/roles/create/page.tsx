"use client";

import { useRouter } from "next/navigation";
import RoleForm from "@/components/admin/roles/RoleForm";

export default function CreateRolePage() {
  const router = useRouter();

  const onSuccess = () => {
    alert("نقش با موفقیت ایجاد شد.");
    router.push("/admin/roles");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">ایجاد نقش جدید</h1>
      <RoleForm onSuccess={onSuccess} />
    </div>
  );
}
