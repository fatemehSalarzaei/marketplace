"use client";

import { Role } from "@/types/admin/roles/role";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  role: Role | null;
}

export default function DeleteRoleModal({
  open,
  onClose,
  onConfirm,
  role,
}: Props) {
  if (!open || !role) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <p className="mb-4">آیا از حذف نقش {role.name} مطمئن هستید؟</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            لغو
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
