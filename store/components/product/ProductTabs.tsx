"use client";

import { useState } from "react";
import ProductVideos from "./ProductVideos";
import ProductSpecsTable from "./ProductSpecsTable";
import {
  ProductVariant,
  ProductAttribute,
  ProductVideo,
} from "@/types/products/product";

interface Props {
  variants: ProductVariant[];
  attributes: ProductAttribute[];
  videos: ProductVideo[];
  description: string;
}

const ProductTabs = ({ variants, attributes, videos, description }: Props) => {
  const [tab, setTab] = useState("description");

  return (
    <div className="mt-10">
      <div className="flex border-b mb-4">
        {[
          { key: "description", label: "توضیحات" },
          { key: "specs", label: "خصوصیات" },
          { key: "videos", label: "ویدیوها" },
          { key: "reviews", label: "دیدگاه‌ها" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              tab === t.key
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "description" && (
        <div className="text-gray-800 leading-relaxed">
          <p>{description}</p>
        </div>
      )}

      {tab === "specs" && (
        <ProductSpecsTable attributes={attributes} variants={variants} />
      )}

      {tab === "videos" && (
        <div>
          {videos.length > 0 ? (
            <ProductVideos videos={videos} />
          ) : (
            <p className="text-gray-500">
              ویدیویی برای این محصول ثبت نشده است.
            </p>
          )}
        </div>
      )}

      {tab === "reviews" && (
        <div>
          <p className="text-gray-500">هنوز دیدگاهی ثبت نشده است.</p>
        </div>
      )}
    </div>
  );
};

export default ProductTabs;
