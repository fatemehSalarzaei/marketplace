"use client";

import { useRouter } from "next/navigation";
import { deleteCategory } from "@/services/admin/categories/categoryService";

interface Props {
  id: number;
}

export default function CategoryActions({ id }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("آیا مطمئن هستید که می‌خواهید حذف کنید؟")) {
      await deleteCategory(id);
      router.refresh();
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.push(`/admin/categories/${id}/edit`)}
        className="btn btn-sm btn-warning"
      >
        ویرایش
      </button>
      <button onClick={handleDelete} className="btn btn-sm btn-error">
        حذف
      </button>
    </div>
  );
}
