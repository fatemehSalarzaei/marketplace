"use client";

import { useState, useEffect, useCallback } from "react";
import { Role } from "@/types/admin/roles/role";
import RoleListView from "@/components/admin/roles/RoleListView";
import { useRouter } from "next/navigation";
import { getRoles, deleteRole } from "@/services/admin/roles/roleService";

export default function RoleListPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const router = useRouter();

  const fetchRoles = useCallback(async () => {
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
  }, [page, search]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRequestDelete = (id: number) => {
    const role = roles.find((r) => r.id === id) ?? null;
    setRoleToDelete(role);
  };

  const handleConfirmDelete = async () => {
    if (!roleToDelete) return;
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
    router.push(`/admin/roles/${role.id}/edit`);
  };

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
      onCreateNew={() => router.push("/admin/roles/create")}
    />
  );
}
