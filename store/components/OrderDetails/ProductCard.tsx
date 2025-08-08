"use client";

import RatingReviewSection from "./RatingReviewSection";

export default function ProductCard({ item }: { item: any }) {
  return (
    <div
      className="bg-white rounded shadow p-4 grid grid-cols-1 sm:grid-cols-[100px_1fr_2fr] gap-4 items-start"
      style={{ minWidth: 0 }}
    >
      {/* ستون 1: تصویر محصول */}
      <div className="flex justify-center">
        <img
          src={item.variant.product?.main_image}
          alt={item.title_snapshot}
          className="w-24 h-24 object-cover rounded"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      </div>

      {/* ستون 2: اطلاعات محصول */}
      <div className="flex flex-col justify-center min-w-0">
        <h3 className="font-semibold text-sm truncate">{item.title_snapshot}</h3>
        <p className="text-sm text-gray-600 mt-1 truncate">کد SKU: {item.variant?.sku}</p>

        <div className="mt-3 text-sm space-y-1">
          <p>تعداد: {item.quantity}</p>
          <p>قیمت واحد: {item.unit_price.toLocaleString()} تومان</p>
          <p className="font-medium">
            قیمت کل: {item.total_price.toLocaleString()} تومان
          </p>
        </div>
      </div>

      {/* ستون 3: بخش امتیاز و دیدگاه */}
      <div className="flex flex-col justify-center min-w-1">
        <RatingReviewSection productId={item.variant.product?.id} />
      </div>
    </div>
  );
}
