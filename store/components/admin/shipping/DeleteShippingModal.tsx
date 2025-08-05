"use client";

export default function DeleteShippingModal({ method, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">حذف روش ارسال</h2>
        <p className="mb-4">
          آیا از حذف روش ارسال <strong>{method.name}</strong> مطمئن هستید؟
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="bg-gray-200 px-4 py-2 rounded">انصراف</button>
          <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded">حذف</button>
        </div>
      </div>
    </div>
  );
}
