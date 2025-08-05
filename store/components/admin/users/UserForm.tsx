"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/types/admin/users/user";
import { Role } from "@/types/admin/roles/role";
import { getRoles } from "@/services/admin/roles/roleService";

interface Props {
  user?: User; // اگر موجود باشد ویرایش است، در غیر اینصورت افزودن
  onSubmit: (data: any) => void;
  submitting: boolean;
}

export default function UserForm({ user, onSubmit, submitting }: Props) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesPage, setRolesPage] = useState(1);
  const [rolesSearch, setRolesSearch] = useState("");
  const [hasMoreRoles, setHasMoreRoles] = useState(true);
  const [loadingRoles, setLoadingRoles] = useState(false);

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone_number: user?.phone_number || "",
    national_code: user?.national_code || "",
    email: user?.email || "",
    birth_date: user?.birth_date || "",
    role: user?.role || null,
    is_active: user?.is_active ?? true,
    is_superuser: user?.is_superuser ?? false,
    is_staff: user?.is_staff ?? true,
    password: "",
  });

  useEffect(() => {
    fetchRoles(1, rolesSearch, true);
  }, [rolesSearch]);

  const fetchRoles = async (
    page: number,
    search: string,
    replace: boolean = false
  ) => {
    if (loadingRoles) return;
    setLoadingRoles(true);
    try {
      const res = await getRoles(page, search);
      const newRoles = res.data.results;
      setHasMoreRoles(!!res.data.next);
      setRoles((prev) => (replace ? newRoles : [...prev, ...newRoles]));
      setRolesPage(page);
    } finally {
      setLoadingRoles(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 20) {
      if (hasMoreRoles && !loadingRoles) {
        fetchRoles(rolesPage + 1, rolesSearch);
      }
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = { ...formData };

    if (!dataToSend.password) delete dataToSend.password;
    if (!dataToSend.birth_date) delete dataToSend.birth_date;

    onSubmit(dataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 font-iranyekan">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-semibold">نام</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={onChange}
            required
            className="input-text border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">نام خانوادگی</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={onChange}
            required
            className="input-text border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">شماره تماس</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={onChange}
            required
            className="input-text border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">کد ملی</label>
          <input
            type="text"
            name="national_code"
            value={formData.national_code}
            onChange={onChange}
            className="input-text border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">ایمیل</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="input-text border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">تاریخ تولد</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date || ""}
            onChange={onChange}
            className="input-text border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-1 font-semibold">نقش</label>
          <input
            type="text"
            placeholder="جستجو نقش..."
            value={rolesSearch}
            onChange={(e) => setRolesSearch(e.target.value)}
            className="input-text mb-2 border border-gray-300 rounded px-3 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div
            className="border border-gray-300 rounded max-h-48 overflow-auto"
            onScroll={handleScroll}
          >
            {roles.length === 0 && !loadingRoles && (
              <p className="p-2 text-center text-gray-500">نقشی یافت نشد</p>
            )}
            {roles.map((role) => (
              <div
                key={role.id}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={formData.role === role.id}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, role: role.id }))
                    }
                  />
                  <span>{role.name}</span>
                </label>
              </div>
            ))}
            {loadingRoles && (
              <p className="p-2 text-center text-gray-400">
                در حال بارگذاری...
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 flex items-center gap-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={onChange}
            />
            وضعیت فعال
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="is_staff"
              checked={formData.is_staff}
              onChange={onChange}
            />
            ادمین
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="is_superuser"
              checked={formData.is_superuser}
              onChange={onChange}
            />
            سوپر ادمین
          </label>
        </div>

        <div className="col-span-2">
          <label className="block mb-1 font-semibold">
            {user ? "تغییر رمز عبور (در صورت نیاز)" : "رمز عبور"}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            className="input-text border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="new-password"
            {...(user ? {} : { required: true })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full py-2 text-lg bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "در حال ارسال..." : user ? "ویرایش کاربر" : "ایجاد کاربر"}
      </button>
    </form>
  );
}
