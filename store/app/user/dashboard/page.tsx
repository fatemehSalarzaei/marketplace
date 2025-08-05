// app/user/profile/page.tsx
"use client";

import React from "react";
import DashboardPage from "@/components/user/dashboard/DashboardPage";

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <DashboardPage />
    </div>
  );
}
