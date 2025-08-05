"use client";

import AdminHeader from "@/components/admin/layout/AdminHeader";
import AdminSidebarMenu from "@/components/admin/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* هدر با ارتفاع کمتر */}
      <AdminHeader />

      <div className="flex flex-row min-h-screen pt-12 mx-0 px-0">
        {/* سایدبار سمت راست که با اسکرول حرکت می‌کند */}
        <aside className="w-70 shrink-0 border-l border-gray-200 bg-white p-0 m-0 ">
          <AdminSidebarMenu />
        </aside>

        {/* محتوای اصلی */}
        <main className="flex-1 p-0 m-0">{children}</main>
      </div>
    </>
  );
}
