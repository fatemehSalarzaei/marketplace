"use client";

import React from "react";

interface DeleteAttributeModalProps {
  attribute: { id: number; name: string };
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteAttributeModal({
  attribute,
  onCancel,
  onConfirm,
}: DeleteAttributeModalProps) {
  return (
    <div
      className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 id="delete-modal-title" className="text-lg font-semibold mb-4">
          حذف خصوصیت
        </h2>
        <p className="mb-6">
          آیا از حذف خصوصیت{" "}
          <span className="font-bold">{attribute.name}</span> مطمئن هستید؟
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
