"use client";

import { User } from "@/types/admin/users/user";
import { useRouter } from "next/navigation";
import { toJalaali } from "jalaali-js";
import { useAuth } from "@/context/AuthContext";
import { useMemo } from "react";

interface UserTableProps {
  users: User[];
}

const formatToJalali = (dateString: string) => {
  const date = new Date(dateString);
  const j = toJalaali(date);
  return `${j.jy}/${j.jm.toString().padStart(2, "0")}/${j.jd
    .toString()
    .padStart(2, "0")}`;
};

export default function UserTable({ users }: UserTableProps) {
  const router = useRouter();
  const { permissions: rawPermissions } = useAuth();

  const permissions = useMemo(() => {
    const userPerm = rawPermissions?.find((p) => p.model.code === "user");
    return {
      canViewUser: !!userPerm?.can_read,
      canEditUser: !!userPerm?.can_update,
    };
  }, [rawPermissions]);

  if (!rawPermissions) return <p className="text-center mt-10">در حال بارگذاری...</p>;
  if (!permissions.canViewUser && !permissions.canEditUser)
    return <p className="text-center text-red-600 mt-10">دسترسی به کاربران وجود ندارد.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-right">نام</th>
            <th className="px-4 py-2 text-right">نام خانوادگی</th>
            <th className="px-4 py-2 text-right">ایمیل</th>
            <th className="px-4 py-2 text-right">فعال</th>
            <th className="px-4 py-2 text-right">تاریخ عضویت</th>
            {(permissions.canEditUser || permissions.canViewUser) && (
              <th className="px-4 py-2 text-center">عملیات</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2">{user.first_name}</td>
              <td className="px-4 py-2">{user.last_name}</td>
              <td className="px-4 py-2">{user.email || "-"}</td>
              <td className="px-4 py-2">{user.is_active ? "فعال" : "غیرفعال"}</td>
              <td className="px-4 py-2">{formatToJalali(user.date_joined)}</td>
              {(permissions.canEditUser || permissions.canViewUser) && (
                <td className="px-4 py-2 text-center space-x-2">
                  {permissions.canEditUser && (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => router.push(`/admin/admin-users/${user.id}`)}
                    >
                      ویرایش
                    </button>
                  )}
                  {permissions.canViewUser && (
                    <button
                      className="text-gray-700 hover:underline"
                      onClick={() =>
                        router.push(`/admin/regular-users/${user.id}`)
                      }
                    >
                      مشاهده
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
