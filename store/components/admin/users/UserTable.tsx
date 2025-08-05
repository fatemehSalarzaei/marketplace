"use client";

import { User } from "@/types/admin/users/user";
import { useRouter } from "next/navigation";
import { toJalaali } from "jalaali-js";

interface UserTableProps {
  users: User[];
  isEditable?: boolean; // ادمین امکان ویرایش دارد
  isViewable?: boolean; // کاربران عادی امکان مشاهده دارند
  editButtonText?: string; // متن دکمه ویرایش
  viewButtonText?: string; // متن دکمه مشاهده
}

const formatToJalali = (dateString: string) => {
  const date = new Date(dateString);
  const j = toJalaali(date);
  return `${j.jy}/${j.jm.toString().padStart(2, "0")}/${j.jd
    .toString()
    .padStart(2, "0")}`;
};

export default function UserTable({
  users,
  isEditable = false,
  isViewable = false,
  editButtonText = "ویرایش",
  viewButtonText = "مشاهده",
}: UserTableProps) {
  const router = useRouter();
  const totalPages = Math.ceil(users.length / 10); // اگر صفحه بندی داری بهتر حساب کنی

  const handleEdit = (id: number) => {
    router.push(`/admin/admin-users/${id}`);
  };

  const handleView = (id: number) => {
    router.push(`/admin/regular-users/${id}`);
  };

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
            {(isEditable || isViewable) && (
              <th className="px-4 py-2 text-center">عملیات</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.length === 0 && (
            <tr>
              <td
                colSpan={isEditable || isViewable ? 6 : 5}
                className="text-center py-4 text-gray-500"
              >
                کاربری یافت نشد.
              </td>
            </tr>
          )}
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2">{user.first_name}</td>
              <td className="px-4 py-2">{user.last_name}</td>
              <td className="px-4 py-2">{user.email || "-"}</td>
              <td className="px-4 py-2">
                {user.is_active ? "فعال" : "غیرفعال"}
              </td>
              <td className="px-4 py-2">{formatToJalali(user.date_joined)}</td>
              {(isEditable || isViewable) && (
                <td className="px-4 py-2 text-center space-x-2">
                  {isEditable && (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(user.id)}
                    >
                      {editButtonText}
                    </button>
                  )}
                  {isViewable && (
                    <button
                      className="text-gray-700 hover:underline"
                      onClick={() => handleView(user.id)}
                    >
                      {viewButtonText}
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
