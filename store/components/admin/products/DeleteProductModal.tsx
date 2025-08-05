"use client";

import { Product } from "@/services/products/fetchProducts";

interface Props {
  product: Product;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteProductModal({ product, onCancel, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">حذف محصول</h2>
        <p className="mb-4">
          آیا از حذف محصول <strong>{product.name}</strong> مطمئن هستید؟
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
