// components/UserSidebar.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Package, Heart, MessageSquare, MapPin, Bell, Clock, Headset, Pencil, LogOut } from "lucide-react";

export default function UserSidebar() {
  const { isLoggedIn, userName, userPhone, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleEditProfile = () => router.push("/user/profile");

  const menuItems = [
    { label: "سفارش‌ها", href: "/user/orders", icon: <Package className="w-5 h-5" /> },
    { label: "لیست‌های علاقه‌مندی", href: "/user/favorites", icon: <Heart className="w-5 h-5" /> },
    { label: "دیدگاه‌ها و پرسش‌ها", href: "/user/reviews", icon: <MessageSquare className="w-5 h-5" /> },
    { label: "آدرس‌ها", href: "/user/addresses", icon: <MapPin className="w-5 h-5" /> },
    { label: "پیام‌ها", href: "/user/notifications", icon: <Bell className="w-5 h-5" /> },
    { label: "بازدیدهای اخیر", href: "/user/recent-views", icon: <Clock className="w-5 h-5" /> },
    { label: "پشتیبانی و تیکت", href: "/user/support", icon: <Headset className="w-5 h-5" /> },
  ];

  return (
    <nav className="flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <span className="font-semibold text-neutral-800">{userName || userPhone || "کاربر مهمان"}</span>
        <button onClick={handleEditProfile} className="flex items-center gap-1 text-blue-600 hover:underline text-sm">
          <Pencil className="w-4 h-4" />
          <span>ویرایش</span>
        </button>
      </div>

      {menuItems.map(({ label, href, icon }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link key={label} href={href} className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-100 transition ${isActive ? "text-blue-600 font-semibold bg-gray-100" : "text-neutral-700"}`}>
            {icon}<span className="grow text-right">{label}</span>
          </Link>
        );
      })}

      {isLoggedIn && (
        <button onClick={() => { logout(); router.replace("/"); }} className="flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-gray-100 transition text-right mt-2">
          <LogOut className="w-5 h-5" />
          <span className="grow text-right">خروج</span>
        </button>
      )}
    </nav>
  );
}
