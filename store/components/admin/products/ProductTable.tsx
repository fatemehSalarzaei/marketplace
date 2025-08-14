"use client";

import Link from "next/link";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Product } from "@/services/admin/products/productService";
import { useAuth } from "@/context/AuthContext";

interface Props {
  products: Product[];
  page: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onRequestDelete: (id: string) => void;
}

const STATUS_LABELS: Record<string, string> = {
  draft: "پیش‌نویس",
  published: "منتشر شده",
};

export default function ProductTable({
  products,
  page,
  totalCount,
  onPageChange,
  onRequestDelete,
}: Props) {
  const { hasPermission } = useAuth();
  const canUpdate = hasPermission("product", "update");
  const canDelete = hasPermission("product", "delete");

  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-separate border-spacing-y-2">
        <thead className="bg-gray-100">
          <tr className="text-gray-700 text-sm">
            <th className="px-4 py-2">نام</th>
            <th className="px-4 py-2">دسته‌بندی</th>
            <th className="px-4 py-2">موجودی</th>
            <th className="px-4 py-2">وضعیت</th>
            {(canUpdate || canDelete) && <th className="px-4 py-2">عملیات</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="bg-white border border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.category?.name || "بدون دسته‌بندی"}</td>
              <td className="px-4 py-2">{product.total_stock || "نامشخص"}</td>
              <td className="px-4 py-2">{STATUS_LABELS[product.status] || "نامشخص"}</td>
              {(canUpdate || canDelete) && (
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    {canUpdate && (
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </Link>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => onRequestDelete(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              )}
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
