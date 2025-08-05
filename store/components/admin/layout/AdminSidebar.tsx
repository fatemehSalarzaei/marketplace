"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  LogOut,
  Users,
  Tags,
  Image,
  Video,
  Home,
  Box,
  Sliders,
  ShoppingCart,
  Truck,
  CreditCard,
  BarChart2,
  Edit3,
  FileText,
  RefreshCcw,
  DollarSign,
  Ticket,
  LayoutDashboard,
} from "lucide-react";

export default function AdminSidebarMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState({ fullName: "", phone: "" });
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  useEffect(() => {
    const fullName = localStorage.getItem("full_name") || "";
    const phone = localStorage.getItem("phone_numbers") || "";
    setUser({ fullName, phone });
  }, []);

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/auth/login");
  };

  const handleEditProfile = () => {
    router.push("/admin/profile");
  };
  const menuItems = [
    {
      label: "مدیریت کاربران",
      icon: Users,
      key: "users",
      children: [
        { label: "کاربران سایت", href: "/admin/regular-users" },
        { label: "کاربران ادمین", href: "/admin/admin-users" },
        { label: "نقش‌ها", href: "/admin/roles" },
        { label: "گزارشات کاربران", href: "/admin/users/reports" },
      ],
    },
    {
      label: "مدیریت محصولات",
      icon: Box,
      key: "products",
      children: [
        { label: "لیست محصولات", href: "/admin/products" },
        { label: "دسته‌بندی‌ها", href: "/admin/categories" },
        { label: "برندها", href: "/admin/brands" },
        { label: "خصوصیات محصولات", href: "/admin/product-attributes" },
      ],
    },
    {
      label: "مدیریت سفارشات",
      icon: ShoppingCart,
      key: "orders",
      children: [
        { label: "سفارشات", href: "/admin/orders" },
        { label: "درخواست‌های مرجوعی", href: "/admin/return-requests" },
        { label: "فاکتورها", href: "/admin/invoices" },
        { label: "پرداخت‌ها", href: "/admin/payments" },
      ],
    },
    {
      label: "حمل‌ونقل و پرداخت",
      icon: Truck,
      key: "shipping",
      children: [
        { label: "شیوه‌های ارسال", href: "/admin/shipping-methods" },
        { label: "درگاه‌های پرداخت", href: "/admin/payment-gateways" },
      ],
    },
    {
      label: "مدیریت رسانه",
      icon: Image,
      key: "media",
      children: [
        { label: "تصاویر", href: "/admin/image-assets" },
        { label: "ویدیوها", href: "/admin/video-assets" },
        { label: "بنرها", href: "/admin/banners" },
      ],
    },
    {
      label: "پشتیبانی",
      icon: Ticket,
      key: "support",
      children: [
       
        { label: " نظرات کاربران", href: "/admin/support/reviews" },
        { label: "لیست تیکت‌ها", href: "/admin/support/tickets" },
        { label: "دسته‌بندی پشتیبانی", href: "/admin/support/categories" },
      ],
    },
    {
      label: "صفحه اصلی سایت",
      icon: Home,
      key: "homepage",
      children: [
        { label: "نوع المان‌ها", href: "/admin/homepage/types" },
        { label: "المان‌ها", href: "/admin/homepage/elements" },
        { label: "آیتم المان‌ها", href: "/admin/homepage/items" },
      ],
    },
    {
      label: "گزارشات و آمار",
      href: "/admin/reports",
      icon: BarChart2,
    },
    {
      label: "خروج",
      href: "/logout",
      icon: LogOut,
      isLogout: true,
    },
  ];

  return (
    <nav className="flex flex-col h-full bg-white border-l border-gray-200 text-right rtl p-4">
      {/* اطلاعات کاربر */}
      <div className="mb-6 px-4 py-3 border-b border-gray-300 flex items-center justify-between">
        <span className="font-semibold text-gray-800 truncate ml-10">
          {user.fullName || user.phone || "کاربر مهمان"}
        </span>
        <button
          onClick={handleEditProfile}
          className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
          type="button"
        >
          <Edit3 className="w-4 h-4" />
          <span>ویرایش</span>
        </button>
      </div>

      {/* منوها */}
      <div className="flex flex-col gap-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive =
            item.href &&
            (pathname === item.href || pathname.startsWith(item.href + "/"));
          const isOpen = item.key && openMenus.includes(item.key);

          if (item.isLogout) {
            return (
              <button
                key={item.label}
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 mt-auto text-red-600 hover:bg-gray-100 rounded transition"
                type="button"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          }

          if (item.children) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.key!)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded transition text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronLeft className="w-4 h-4" />
                  )}
                </button>
                {isOpen && (
                  <div className="ml-6 flex flex-col gap-1 mt-1">
                    {item.children.map((sub) => {
                      const subActive =
                        pathname === sub.href ||
                        pathname.startsWith(sub.href + "/");
                      return (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className={`text-sm px-4 py-2 rounded transition ${
                            subActive
                              ? "bg-blue-100 text-blue-600 font-semibold"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              className={`flex items-center gap-3 px-4 py-3 rounded transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
