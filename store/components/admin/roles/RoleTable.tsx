"use client";

import Link from "next/link";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Role } from "@/types/admin/roles/role";
import { modelTranslations } from "@/constants/modelTranslations";

interface Props {
  roles: Role[];
  loading: boolean;
  onDeleteClick: (role: Role) => void;
}

export default function RoleTable({ roles, loading, onDeleteClick }: Props) {
  if (loading) return <p>در حال بارگذاری...</p>;
  if (roles.length === 0) return <p>هیچ نقشی پیدا نشد.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-separate border-spacing-y-2">
        <thead className="bg-gray-100">
          <tr className="text-gray-700">
            <th className="px-4 py-2">نام نقش</th>
            <th className="px-4 py-2">دسترسی به مدل‌ها</th>
            <th className="px-4 py-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => {
            const permissions = role.model_permissions || [];
            const modelsList = permissions
              .filter(
                (perm) =>
                  perm.can_create ||
                  perm.can_read ||
                  perm.can_update ||
                  perm.can_delete
              )
              .map((perm) => {
                const modelCode = perm.model.code.toLowerCase();
                return modelTranslations[modelCode] || modelCode;
              });
            const displayModels =
              modelsList.length > 4
                ? modelsList
                    .slice(0, 4)
                    .map((m) => `● ${m}`)
                    .join(", ") + ", ..."
                : modelsList.map((m) => `● ${m}`).join(", ");

            return (
              <tr
                key={role.id}
                className="bg-white border hover:bg-gray-50 align-top"
              >
                <td className="px-4 py-2">{role.name}</td>
                <td className="px-4 py-2 whitespace-pre-line text-sm">
                  {modelsList.length > 0 ? (
                    displayModels
                  ) : (
                    <span className="text-gray-400">بدون دسترسی</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/roles/${role.id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => onDeleteClick(role)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
