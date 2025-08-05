"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { SupportCategory } from "@/types/admin/support/supportCategory";

interface Props {
  data: SupportCategory[];
  onRequestEdit: (item: SupportCategory) => void;
  onRequestDelete: (item: SupportCategory) => void;
}

export default function SupportCategoryTable({
  data,
  onRequestEdit,
  onRequestDelete,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-separate border-spacing-y-2">
        <thead className="bg-gray-100">
          <tr className="text-gray-700">
            <th className="px-4 py-2 text-right">نام</th>
            <th className="px-4 py-2 text-right">توضیحات</th>
            <th className="px-4 py-2 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="bg-white border hover:bg-gray-50">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.description || "-"}</td>
              <td className="px-4 py-2">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onRequestEdit(item)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onRequestDelete(item)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
