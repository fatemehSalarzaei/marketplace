"use client";

import Link from "next/link";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Category } from "@/types/admin/categories/category";
import { useAuth } from "@/context/AuthContext";

interface Props {
  categories: Category[];
  page: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onRequestDelete: (id: number) => void;
}

export default function CategoryTable({ categories, page, totalCount, onPageChange, onRequestDelete }: Props) {
  const totalPages = Math.ceil(totalCount / 10);
  const fallbackImage = "/images/default-category.png";
  const { hasPermission } = useAuth();

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-separate border-spacing-y-2">
        <thead className="bg-gray-100">
          <tr className="text-gray-700">
            <th className="px-4 py-2">تصویر</th>
            <th className="px-4 py-2">نام</th>
            <th className="px-4 py-2">دسته والد</th>
            <th className="px-4 py-2">وضعیت</th>
            <th className="px-4 py-2">تاریخ ایجاد</th>
            <th className="px-4 py-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="bg-white border border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : null}
              </td>
              <td className="px-4 py-2">{cat.name}</td>
              <td className="px-4 py-2">{cat.parent?.name || "-"}</td>
              <td className="px-4 py-2">{cat.is_active ? "فعال" : "غیرفعال"}</td>
              <td className="px-4 py-2">{new Date(cat.created_at).toLocaleDateString("fa-IR")}</td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  {hasPermission("category", "update") && (
                    <Link href={`/admin/categories/edit/${cat.id}`} className="text-blue-600 hover:text-blue-800">
                      <PencilSquareIcon className="w-5 h-5" />
                    </Link>
                  )}
                  {hasPermission("category", "delete") && (
                    <button onClick={() => onRequestDelete(cat.id)} className="text-red-600 hover:text-red-800">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`mx-1 px-3 py-1 rounded border ${
              page === i + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700 border-gray-300"
            }`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
