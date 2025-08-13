// components/UserSidebar.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Package,
  Heart,
  MessageSquare,
  MapPin,
  Bell,
  Clock,
  Headset,
  Pencil,
  LogOut,
} from "lucide-react";
import { logoutUser } from "@/services/auth/logout"; // مسیر سرویس logout

export default function UserSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState({ name: "", phone: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("full_name") || "";
    const phone = localStorage.getItem("phone_numbers") || "";
    const token = localStorage.getItem("access_token");
    setUser({ name, phone });
    setIsLoggedIn(!!token);
  }, []);

  const handleEditProfile = () => {
    router.push("/user/profile");
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); // فراخوانی API خروج
      localStorage.removeItem("access_token");
      localStorage.removeItem("full_name");
      localStorage.removeItem("phone_numbers");
      setIsLoggedIn(false);
      router.replace("/auth/login");
    } catch (err) {
      console.error("خطا در خروج:", err);
    }
  };

  const menuItems = [
    { label: "سفارش‌ها", href: "/user/orders", icon: Package },
    { label: "لیست‌های علاقه‌مندی", href: "/user/favorites", icon: Heart },
    { label: "دیدگاه‌ها و پرسش‌ها", href: "/user/reviews", icon: MessageSquare },
    { label: "آدرس‌ها", href: "/user/addresses", icon: MapPin },
    { label: "پیام‌ها", href: "/user/notifications", icon: Bell },
    { label: "بازدیدهای اخیر", href: "/user/recent-views", icon: Clock },
    { label: "پشتیبانی و تیکت", href: "/user/support", icon: Headset },
  ];

  return (
    <nav className="flex flex-col h-full bg-white border-l border-gray-200 text-right rtl p-4">
      {/* اطلاعات کاربر */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <span className="font-semibold text-gray-800 truncate ml-2">
          {user.name || user.phone || "کاربر مهمان"}
        </span>
        <button
          onClick={handleEditProfile}
          className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
        >
          <Pencil className="w-4 h-4" />
          <span>ویرایش</span>
        </button>
      </div>

      {/* منوها */}
      <div className="flex flex-col gap-1 mt-2">
        {menuItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-6 py-3 rounded transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="grow text-right">{label}</span>
            </Link>
          );
        })}
      </div>

      {/* دکمه خروج */}
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-gray-100 transition mt-4 rounded"
        >
          <LogOut className="w-5 h-5" />
          <span className="grow text-right">خروج</span>
        </button>
      )}
    </nav>
  );
}
