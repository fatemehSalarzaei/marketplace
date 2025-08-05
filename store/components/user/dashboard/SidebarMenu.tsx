"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { logoutUser } from "@/services/auth/logout";
import { Pencil } from "lucide-react";

export default function SidebarMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<{ fullName: string; phone: string }>({
    fullName: "",
    phone: "",
  });

  useEffect(() => {
    const fullName = localStorage.getItem("full_name") || "";
    const phone = localStorage.getItem("phone_numbers") || "";
    setUser({ fullName, phone });
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logoutUser();
    router.replace("/");
  };

  const handleEditProfile = () => {
    router.push("/user/profile");
  };

  const menuItems = [
    { label: "خلاصه فعالیت‌ها", href: "/user", icon: "🏠" },
    { label: "سفارش‌ها", href: "/user/orders", icon: "📦" },
    { label: "لیست‌های من", href: "/user/lists", icon: "📋" },
    { label: "دیدگاه‌ها و پرسش‌ها", href: "/user/comments", icon: "💬" },
    { label: "آدرس‌ها", href: "/user/addresses", icon: "🏠" },
    { label: "کارت‌های هدیه", href: "/user/gift-cards", icon: "🎁" },
    { label: "پیام‌ها", href: "/user/notification", icon: "🔔" },
    { label: "بازدید‌های اخیر", href: "/user/user-history", icon: "🕒" },
    { label: "اطلاعات حساب کاربری", href: "/user/personal-info", icon: "👤" },
    { label: "خروج", href: "/logout", icon: "🚪", isLogout: true },
  ];

  return (
    <nav className="flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <span className="font-semibold text-neutral-800">
          {user.fullName || user.phone || "کاربر مهمان"}
        </span>
        <button
          onClick={handleEditProfile}
          className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
        >
          <Pencil className="w-4 h-4" />
          <span>ویرایش</span>
        </button>
      </div>

      {menuItems.map(({ label, href, icon, isLogout }) => {
        const isActive =
          href === "/user"
            ? pathname === "/user"
            : pathname.startsWith(href + "/") || pathname === href;

        return isLogout ? (
          <button
            key={label}
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-gray-100 transition text-right"
          >
            <span>{icon}</span>
            <span className="grow text-right">{label}</span>
          </button>
        ) : (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-100 transition ${
              isActive
                ? "text-blue-600 font-semibold bg-gray-100"
                : "text-neutral-700"
            }`}
          >
            <span>{icon}</span>
            <span className="grow text-right">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
