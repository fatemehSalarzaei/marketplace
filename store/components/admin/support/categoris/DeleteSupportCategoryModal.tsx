"use client";

import { SupportCategory } from "@/types/admin/support/supportCategory";

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  category: SupportCategory | null;
}

export default function DeleteSupportCategoryModal({ open, onCancel, onConfirm, category }: Props) {
  if (!open || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">حذف دسته‌بندی</h2>
        <p className="mb-4">
          آیا مطمئن هستید که می‌خواهید <strong>{category.name}</strong> را حذف کنید؟
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="btn-sm bg-gray-200 hover:bg-gray-300 w-24">
            انصراف
          </button>
          <button onClick={onConfirm} className="btn-sm bg-red-600 hover:bg-red-700 text-white w-24">
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
