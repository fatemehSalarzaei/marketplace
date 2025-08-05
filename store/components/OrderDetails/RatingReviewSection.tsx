"use client";

import { useState } from "react";

export default function RatingReviewSection() {
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    console.log("امتیاز:", rating);
    console.log("دیدگاه:", review);
    // اینجا می‌تونی درخواست ارسال به سرور بزنی
  };

  return (
    <div className="flex flex-col lg:flex-row mt-6 gap-4 items-start">
      {/* امتیازدهی */}
      <div className="lg:min-w-1/3 lg:max-w-[40%] w-full">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">امتیاز دهید!</p>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="flex flex-col items-center">
                <div className="cursor-pointer" onClick={() => setRating(star)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={
                      rating !== null && rating >= star ? "#facc15" : "#d1d5db"
                    }
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.048 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.783.57-1.838-.197-1.538-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.97 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-xs text-neutral-500">{star}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* دکمه ثبت دیدگاه */}
      <div className="flex-grow flex justify-start lg:justify-end w-full">
        <button
          onClick={handleSubmit}
          className="flex items-center text-sm border border-blue-600 text-blue-600 rounded px-4 py-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 8h10M7 12h4m1 9l-1-1H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-5l-1 1z"
            />
          </svg>
          ثبت دیدگاه
        </button>
      </div>
    </div>
  );
}
