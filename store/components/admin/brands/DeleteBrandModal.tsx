"use client";

import { Brand } from "@/types/admin/brands/brand";

interface DeleteBrandModalProps {
  brand: Brand;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteBrandModal({
  brand,
  onCancel,
  onConfirm,
}: DeleteBrandModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white border rounded-md shadow-lg p-6 w-80">
        <h2 className="text-lg font-semibold mb-4">حذف برند</h2>
        <p className="mb-4">
          آیا از حذف برند <strong>{brand.name}</strong> مطمئن هستید؟
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-sm bg-gray-200 hover:bg-gray-300 text-gray-800 w-24 h-10"
            onClick={onCancel}
          >
            انصراف
          </button>
          <button
            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white w-24 h-10"
            onClick={onConfirm}
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
