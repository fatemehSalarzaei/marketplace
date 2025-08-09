"use client";

import { useEffect, useState } from "react";
import { fetchRecentViews } from "@/services/recentViews/recentViewsService";
import { RecentViewsList } from "@/types/recentViews/recentViews";
import RecentViewItem from "./RecentViewItem";

export default function RecentViewsList() {
  const [views, setViews] = useState<RecentViewsList>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentViews()
      .then((data) => setViews(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-3">در حال بارگذاری...</p>;
  if (!views.length) return <p className="p-3 text-gray-500">هیچ بازدیدی ثبت نشده است.</p>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <h2 className="text-lg font-semibold px-4 py-3 border-b">بازدیدهای اخیر</h2>
      {views.map((view) => (
        <RecentViewItem key={view.id} view={view} />
      ))}
    </div>
  );
}
