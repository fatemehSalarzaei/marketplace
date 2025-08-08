"use client";

import { Review } from "@/types/reviews/review";
import Link from "next/link";

const statusLabels: Record<string, string> = {
  pending: "در انتظار تایید",
  approved: "تایید شده",
  rejected: "رد شده",
};

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl shadow-lg p-4 bg-white hover:shadow-xl transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-2 items-start">
        {/* ستون راست: محصول */}
        <div className="flex items-start gap-2">
          {review.product.main_image_url && (
            <img
              src={review.product.main_image_url}
              alt={review.product.name}
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <Link
              href={`/product/${review.product.id}/${review.product.slug}`}
              className="font-semibold text-blue-600 hover:underline leading-tight"
            >
              {review.product.name}
            </Link>
            <p className="text-sm text-gray-500 mb-0 mt-0">
              {new Date(review.created_at).toLocaleDateString("fa-IR")}
            </p>

            {/* وضعیت */}
            <p className="text-xs font-semibold mt-1">
              وضعیت:{" "}
              <span
                className={
                  review.status === "approved"
                    ? "text-green-600"
                    : review.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }
              >
                {statusLabels[review.status] || review.status}
              </span>
            </p>

            {/* امتیاز */}
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ستون چپ: متن نظر */}
        <div className="text-gray-700 leading-relaxed max-w-full">
          {review.comment}
        </div>
      </div>
    </div>
  );
}
