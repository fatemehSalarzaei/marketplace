"use client";

import { useEffect, useState } from "react";
import { getAdminUsers } from "@/services/admin/users/getUsers";
import { User } from "@/types/admin/users/user";
import UserTable from "@/components/admin/users/UserTable";
import AdminUserFilters from "@/components/admin/users/AdminUserFilters";
import Link from "next/link";

export default function AdminUsersPage() {
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
    const fetchData = async () => {
      try {
        setLoading(true);

        const params: Record<string, string | number> = {
          page,
        };

        if (search.trim() !== "") {
          params.search = search.trim();
        }
        if (filters.isActive !== "") {
          params.is_active = filters.isActive;
        }
        if (filters.isSuperuser !== "") {
          params.is_superuser = filters.isSuperuser;
        }
        if (filters.isStaff !== "") {
          params.is_staff = filters.isStaff;
        }

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
  }, [search, page, filters]);

  const handleFiltersChange = (name: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1); // هنگام تغییر فیلتر صفحه را ریست کن
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">لیست کاربران ادمین</h1>
        <Link
          href="/admin/admin-users/create"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded"
        >
          + افزودن کاربر جدید
        </Link>
      </div>

      {/* فیلتر و جستجو */}
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
        isEditable
      />
    </div>
  );
}
