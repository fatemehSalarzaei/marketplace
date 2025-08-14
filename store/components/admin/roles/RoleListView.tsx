"use client";

import React from "react";
import { Role } from "@/types/admin/roles/role";
import RoleSearch from "./RoleSearch";
import RoleTable from "./RoleTable";
import DeleteRoleModal from "./DeleteRoleModal";
import { useAuth } from "@/context/AuthContext";

interface Props {
  roles: Role[];
  totalCount: number;
  page: number;
  search: string;
  loading: boolean;
  error: string | null;
  roleToDelete: Role | null;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onRequestDelete: (id: number) => void;
  onRequestEdit: (role: Role) => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  onCreateNew: () => void;
}

export default function RoleListView({
  roles,
  totalCount,
  page,
  search,
  loading,
  error,
  roleToDelete,
  onSearchChange,
  onPageChange,
  onRequestDelete,
  onRequestEdit,
  onConfirmDelete,
  onCancelDelete,
  onCreateNew,
}: Props) {
  const { hasPermission, loadingPermissions } = useAuth();

  if (loadingPermissions) return <p>در حال بررسی مجوزها...</p>;

  const canCreate = hasPermission("role", "create");

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">مدیریت نقش‌ها</h1>
        {canCreate && (
          <button
            onClick={onCreateNew}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            افزودن نقش جدید
          </button>
        )}
      </div>

      <RoleSearch search={search} onSearchChange={onSearchChange} />

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <RoleTable
        roles={roles}
        loading={loading}
        onDeleteClick={onRequestDelete}
        onEditClick={onRequestEdit}
      />

      <DeleteRoleModal
        open={!!roleToDelete}
        onClose={onCancelDelete}
        onConfirm={onConfirmDelete}
        role={roleToDelete}
      />
    </div>
  );
}
