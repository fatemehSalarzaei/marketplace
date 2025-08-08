"use client";

import { useEffect, useState } from "react";
import { FavoriteItem } from "@/types/favorites/favorite";
import { favoriteService } from "@/services/favorites/favoriteService";
import FavoriteItemCard from "./FavoriteItemCard";

export default function FavoriteList() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchFavorites = async (pageNumber: number = 1) => {
    setLoading(true);
    try {
      const data = await favoriteService.getFavorites(pageNumber);
      setFavorites(data.results);
      setTotalCount(data.count);
      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const totalPages = Math.ceil(totalCount / 10);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!favorites.length) return <p>لیست علاقه‌مندی‌ها خالی است.</p>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {favorites.map((item) => (
          <FavoriteItemCard
            key={item.id}
            item={item}
            onRemoved={() => fetchFavorites(page)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => fetchFavorites(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          قبلی
        </button>
        <span>صفحه {page} از {totalPages}</span>
        <button
          onClick={() => fetchFavorites(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
