// app/user/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { fetchUserDashboard } from "@/services/user/dashboard/dashboardService";
import { DashboardPayload } from "@/types/dashboard/dashboard";
import DashboardPanel from "@/components/user/dashboard/DashboardPage";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetchUserDashboard();
        setData(res);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "خطا در دریافت داده‌ها");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-6">در حال بارگذاری...</div>;
  if (error) return <div className="p-6 text-red-600">خطا: {error}</div>;
  if (!data) return <div className="p-6">داده‌ای موجود نیست.</div>;

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <DashboardPanel data={data} />
    </main>
  );
}
