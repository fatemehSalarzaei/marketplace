"use client";

import { useEffect, useState, useMemo } from "react";
import { getAdminUsers } from "@/services/admin/users/getUsers";
import { User } from "@/types/admin/users/user";
import UserTable from "@/components/admin/users/UserTable";
import AdminUserFilters from "@/components/admin/users/AdminUserFilters";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AdminUsersPage() {
  const { permissions: rawPermissions } = useAuth(); 

  // permissions فقط یکبار محاسبه می‌شود و مرجع ثابت دارد
  const permissions = useMemo(() => {
    const userPerm = rawPermissions?.find((p) => p.model.code === "user");
    return {
      canViewUser: !!userPerm?.can_read,
      canCreateUser: !!userPerm?.can_create,
      canEditUser: !!userPerm?.can_update,
      canDeleteUser: !!userPerm?.can_delete,
    };
  }, [rawPermissions]);

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    isActive: "",
    isSuperuser: "",
    isStaff: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!permissions.canViewUser) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const params: Record<string, string | number> = { page };
        if (search.trim() !== "") params.search = search.trim();
        if (filters.isActive !== "") params.is_active = filters.isActive;
        if (filters.isSuperuser !== "") params.is_superuser = filters.isSuperuser;
        if (filters.isStaff !== "") params.is_staff = filters.isStaff;

        const res = await getAdminUsers(params);
        setUsers(res.data.results);
        setTotalCount(res.data.count);
      } catch (error) {
        console.error("خطا در دریافت کاربران ادمین:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // وابستگی روی rawPermissions و دیگر state‌ها
  }, [search, page, filters, rawPermissions]);

  const handleFiltersChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1); 
  };

  if (!rawPermissions) {
    return <p className="text-center mt-10">در حال بارگذاری...</p>;
  }

  if (!permissions.canViewUser) {
    return <p className="text-center text-red-600 mt-10">دسترسی به این صفحه وجود ندارد.</p>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">لیست کاربران ادمین</h1>
        {permissions.canCreateUser && (
          <Link
            href="/admin/admin-users/create"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded"
          >
            + افزودن کاربر جدید
          </Link>
        )}
      </div>

      <AdminUserFilters
        search={search}
        onSearchChange={setSearch}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      <UserTable
        users={users}
        page={page}
        totalCount={totalCount}
        onPageChange={setPage}
        search={search}
        onSearchChange={setSearch}
        loading={loading}
        isEditable={permissions.canEditUser} 
      />
    </div>
  );
}
