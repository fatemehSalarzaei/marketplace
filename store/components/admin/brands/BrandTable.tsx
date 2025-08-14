"use client";

import Link from "next/link";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Brand } from "@/types/admin/brands/brand";

interface Props {
  brands: Brand[];
  page: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onRequestDelete: (id: number) => void;
  hasPermission: (model: string, action?: "create" | "read" | "update" | "delete") => boolean;
}

export default function BrandTable({
  brands,
  page,
  totalCount,
  onPageChange,
  onRequestDelete,
  hasPermission,
}: Props) {
  const totalPages = Math.ceil(totalCount / 10);
  const fallbackLogo = "/images/default-brand.png";

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-separate border-spacing-y-2">
        <thead className="bg-gray-100">
          <tr className="text-gray-700">
            <th className="px-4 py-2">لوگو</th>
            <th className="px-4 py-2">نام</th>
            <th className="px-4 py-2">وبسایت</th>
            <th className="px-4 py-2">وضعیت</th>
            <th className="px-4 py-2">تاریخ ایجاد</th>
            <th className="px-4 py-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id} className="bg-white border hover:bg-gray-50">
              <td className="px-4 py-2">
                {brand.logo && (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src = fallbackLogo)
                    }
                  />
                )}
              </td>
              <td className="px-4 py-2">{brand.name}</td>
              <td className="px-4 py-2">{brand.website || "-"}</td>
              <td className="px-4 py-2">{brand.is_active ? "فعال" : "غیرفعال"}</td>
              <td className="px-4 py-2">{new Date(brand.created_at).toLocaleDateString("fa-IR")}</td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  {hasPermission("brand", "update") && (
                    <Link
                      href={`/admin/brands/${brand.id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </Link>
                  )}
                  {hasPermission("brand", "delete") && (
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => onRequestDelete(brand.id)}
                    >
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
              page === i + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border-gray-300"
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
