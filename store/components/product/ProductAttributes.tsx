"use client";

import { ProductAttribute } from "@/types/products/product";

interface Props {
  attributes: ProductAttribute[];
  title?: string;
}

const ProductAttributes = ({
  attributes,
  title = "ویژگی‌های محصول",
}: Props) => {
  return (
    <div className="mt-6 px-4 py-2">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
        {attributes.map((attr, i) => (
          <span
            key={i}
            className="bg-gray-50 px-4 py-2 rounded shadow text-xs border border-gray-200"
          >
            {attr.attribute_name || attr.attribute}: {attr.value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductAttributes;
