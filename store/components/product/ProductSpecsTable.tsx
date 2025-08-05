"use client";

import { ProductVariant, ProductAttribute } from "@/types/products/product";

interface Props {
  attributes: ProductAttribute[];
  variants: ProductVariant[];
}

const ProductSpecsTable = ({ attributes, variants }: Props) => {
  // ادغام ویژگی‌های تکراری تنوع با مقادیرشان
  const variantAttributeMap: Record<string, string[]> = {};
  variants.forEach((variant) => {
    variant.attributes.forEach((attr) => {
      if (!variantAttributeMap[attr.attribute]) {
        variantAttributeMap[attr.attribute] = [];
      }
      if (!variantAttributeMap[attr.attribute].includes(attr.value)) {
        variantAttributeMap[attr.attribute].push(attr.value);
      }
    });
  });

  return (
    <div>
      <table className="w-full text-sm border border-gray-300 rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-3 border">ویژگی</th>
            <th className="p-3 border">مقدار</th>
          </tr>
        </thead>
        <tbody>
          {attributes.map((attr, i) => (
            <tr
              key={`attr-${i}`}
              className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="p-3 border text-gray-700 font-medium">
                {attr.attribute_name}
              </td>
              <td className="p-3 border text-gray-600">{attr.value}</td>
            </tr>
          ))}

          {Object.entries(variantAttributeMap).map(([attribute, values], i) => (
            <tr
              key={`variant-attr-${i}`}
              className={
                (i + attributes.length) % 2 === 0 ? "bg-white" : "bg-gray-50"
              }
            >
              <td className="p-3 border text-gray-700 font-medium">
                {attribute} (تنوع)
              </td>
              <td className="p-3 border text-gray-600">{values.join(" - ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecsTable;
