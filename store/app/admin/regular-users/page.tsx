"use client";

import { useEffect, useState } from "react";
import { getRegularUsers } from "@/services/admin/users/getUsers";
import { User } from "@/types/admin/users/user";
import UserTable from "@/components/admin/users/UserTable";
import UserSearch from "@/components/admin/users/UserSearch";

export default function RegularUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getRegularUsers(page, search);
        setUsers(res.data.results);
        setTotalCount(res.data.count);
      } catch (error) {
        console.error("خطا در دریافت کاربران معمولی:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, page]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">لیست کاربران سایت</h1>

      <UserSearch search={search} onSearchChange={setSearch} />

      <UserTable
        users={users}
        page={page}
        totalCount={totalCount}
        onPageChange={setPage}
        search={search}
        onSearchChange={setSearch}
        loading={loading}
        isViewable
      />
    </div>
  );
}
