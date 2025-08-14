"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/types/admin/roles/role";
import RoleListView from "@/components/admin/roles/RoleListView";
import { getRoles, deleteRole } from "@/services/admin/roles/roleService";

export default function RoleListPage() {
  const { hasPermission, loadingPermissions } = useAuth();
  const router = useRouter();

  const [roles, setRoles] = useState<Role[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  // بررسی مجوز read قبل از رندر
  useEffect(() => {
    if (!loadingPermissions && !hasPermission("role", "read")) {
      router.push("/admin/403");
    }
  }, [hasPermission, loadingPermissions, router]);

  const fetchRoles = useCallback(async () => {
    if (!hasPermission("role", "read")) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getRoles(page, search);
      setRoles(res.data.results);
      setTotalCount(res.data.count);
    } catch (error) {
      console.error(error);
      setError("خطا در دریافت نقش‌ها");
    }
    setLoading(false);
  }, [page, search, hasPermission]);

  useEffect(() => {
    if (!loadingPermissions) fetchRoles();
  }, [fetchRoles, loadingPermissions]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRequestDelete = (id: number) => {
    const role = roles.find((r) => r.id === id) ?? null;
    setRoleToDelete(role);
  };

  const handleConfirmDelete = async () => {
    if (!roleToDelete || !hasPermission("role", "delete")) return;
    setLoading(true);
    setError(null);
    try {
      await deleteRole(roleToDelete.id);
      setRoleToDelete(null);
      await fetchRoles();
    } catch (error) {
      console.error(error);
      setError("خطا در حذف نقش");
    }
    setLoading(false);
  };

  const handleCancelDelete = () => {
    setRoleToDelete(null);
  };

  const handleRequestEdit = (role: Role) => {
    if (hasPermission("role", "update")) {
      router.push(`/admin/roles/${role.id}/edit`);
    }
  };

  const handleCreateNew = () => {
    if (hasPermission("role", "create")) {
      router.push("/admin/roles/create");
    }
  };

  if (loadingPermissions) return <p>در حال بررسی مجوزها...</p>;

  return (
    <RoleListView
      roles={roles}
      totalCount={totalCount}
      page={page}
      search={search}
      loading={loading}
      error={error}
      roleToDelete={roleToDelete}
      onSearchChange={setSearch}
      onPageChange={handlePageChange}
      onRequestDelete={handleRequestDelete}
      onRequestEdit={handleRequestEdit}
      onConfirmDelete={handleConfirmDelete}
      onCancelDelete={handleCancelDelete}
      onCreateNew={handleCreateNew}
    />
  );
}
