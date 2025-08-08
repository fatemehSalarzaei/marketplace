"use client";

import { FavoriteItem } from "@/types/favorites/favorite";
import { favoriteService } from "@/services/favorites/favoriteService";
import { useState } from "react";
import Link from "next/link";

interface FavoriteItemCardProps {
  item: FavoriteItem;
  onRemoved: () => void;
}

export default function FavoriteItemCard({ item, onRemoved }: FavoriteItemCardProps) {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    setLoading(true);
    try {
      await favoriteService.removeFavorite({
        product: item.product?.id,
        variant: item.variant?.id,
      });
      onRemoved();
    } catch (error) {
      console.error("Error removing favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col overflow-hidden">
      {/* لینک به صفحه جزئیات */}
      <Link
        href={
          item.product
            ? `/product/${item.product.id}/${item.product.slug}`
            : "#"
        }
        className="flex-1 flex flex-col"
      >
        {/* تصویر */}
        {item.product?.main_image_url && (
          <img
            src={item.product.main_image_url}
            alt={item.product.name}
            className="w-full h-48 object-cover"
          />
        )}

        {/* جزئیات */}
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-semibold truncate">
            {item.product?.name || item.variant?.sku}
          </h3>

          {/* توضیحات کوتاه */}
          {item.product?.short_description && (
            <p
              className="text-gray-500 text-sm mt-1 line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: item.product.short_description,
              }}
            />
          )}

          {/* قیمت در صورت داشتن variant */}
          {item.variant && (
            <p className="text-gray-600 text-sm mt-1">
              {item.variant.price} تومان
            </p>
          )}
        </div>
      </Link>

      {/* دکمه حذف */}
      <button
        onClick={handleRemove}
        disabled={loading}
        className="w-full px-3 py-2 bg-red-600 text-white text-center font-medium hover:bg-red-700 disabled:bg-gray-400 transition-colors"
      >
        {loading ? "..." : "حذف"}
      </button>
    </div>
  );
}
