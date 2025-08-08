
"use client";

import FavoriteList from "@/components/favorites/FavoriteList";

export default function FavoritesPage() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">لیست علاقه‌مندی‌ها</h1>
      <FavoriteList />
    </div>
  );
}
