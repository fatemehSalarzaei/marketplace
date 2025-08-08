"use client";

import { useEffect, useState } from "react";
import { Review } from "@/types/reviews/review";
import { reviewService } from "@/services/reviews/reviewService";
import ReviewCard from "./ReviewCard";

interface ReviewListProps {
  productId?: number;
}

export default function ReviewList({ productId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadReviews = async (pageNum: number) => {
    setLoading(true);
    try {
      const data = await reviewService.getReviews({ product: productId, page: pageNum });
      setReviews(data.results);
      setCount(data.count);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews(page);
  }, [page, productId]);

  const totalPages = Math.ceil(count / 10);

  return (
    <div className="space-y-4">
      {loading && <p>در حال بارگذاری...</p>}

      {!loading && reviews.length === 0 && <p>هیچ نظری یافت نشد.</p>}

      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}

      {/* صفحه‌بندی */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                page === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
