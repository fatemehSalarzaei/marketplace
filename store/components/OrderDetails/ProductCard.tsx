"use client";

import RatingReviewSection from "./RatingReviewSection";

export default function ProductCard({ item }: { item: any }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col sm:flex-row gap-4 items-center">
      {/* تصویر محصول */}
      <img
        src={item.variant?.image}
        alt={item.title_snapshot}
        className="w-24 h-24 object-cover rounded"
      />

      {/* اطلاعات محصول */}
      <div className="flex-1 w-full">
        <h3 className="font-semibold text-sm">{item.title_snapshot}</h3>
        <p className="text-sm text-gray-600 mt-1">
          کد SKU: {item.variant?.sku}
        </p>

        <div className="mt-3 text-sm space-y-1">
          <p>تعداد: {item.quantity}</p>
          <p>قیمت واحد: {item.unit_price.toLocaleString()} تومان</p>
          <p className="font-medium">
            قیمت کل: {item.total_price.toLocaleString()} تومان
          </p>
        </div>

        {/* بخش امتیاز و دیدگاه */}
        <div className="mt-4">
          <RatingReviewSection />
        </div>
      </div>
    </div>
  );
}
