// app/profile/layout.tsx
"use client";

import { ReactNode } from "react";
import SidebarMenu from "@/components/user/dashboard/SidebarMenu";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-64 border-l border-gray-200 h-screen sticky top-0 bg-white">
        <SidebarMenu />
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
