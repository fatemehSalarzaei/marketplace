"use client";

import { useState, useEffect } from "react";
import { ProductVariant } from "@/types/products/product";
import Image from "next/image";
import { addToCart } from "@/services/cart/addToCart";
import { useCart } from "@/context/CartContext"; // اضافه شده

interface Props {
  variants: ProductVariant[];
}

export default function ProductVariantSelector({ variants }: Props) {
  const allAttributes: string[] = [];
  const { refreshCart } = useCart(); // اضافه شده

  variants.forEach((variant) => {
    variant.attributes.forEach(({ attribute }) => {
      if (!allAttributes.includes(attribute)) {
        allAttributes.push(attribute);
      }
    });
  });

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [currentVariant, setCurrentVariant] = useState<ProductVariant | null>(
    null
  );
  const [initialOptions, setInitialOptions] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    const initialOptionsMap: Record<string, Set<string>> = {};
    allAttributes.forEach((attr) => {
      initialOptionsMap[attr] = new Set();
    });

    variants.forEach((variant) => {
      variant.attributes.forEach(({ attribute, value }) => {
        initialOptionsMap[attribute].add(value);
      });
    });

    const optionsArrayMap: Record<string, string[]> = {};
    allAttributes.forEach((attr) => {
      optionsArrayMap[attr] = Array.from(initialOptionsMap[attr]);
    });

    setInitialOptions(optionsArrayMap);

    const initialSelection: Record<string, string> = {};
    if (variants.length > 0) {
      const defaultVariant = variants[0];
      defaultVariant.attributes.forEach(({ attribute, value }) => {
        initialSelection[attribute] = value;
      });
    }

    allAttributes.forEach((attr) => {
      if (!initialSelection[attr]) {
        const values = optionsArrayMap[attr];
        if (values.length > 0) {
          initialSelection[attr] = values[0];
        }
      }
    });

    setSelectedOptions(initialSelection);
  }, [variants]);

  useEffect(() => {
    let filteredVariants = variants;

    Object.entries(selectedOptions).forEach(([attr, value]) => {
      if (value) {
        filteredVariants = filteredVariants.filter((variant) =>
          variant.attributes.some(
            (a) => a.attribute === attr && a.value === value
          )
        );
      }
    });

    const exactMatch = filteredVariants.find((variant) =>
      allAttributes.every((attr) =>
        variant.attributes.some(
          (a) => a.attribute === attr && a.value === selectedOptions[attr]
        )
      )
    );

    setCurrentVariant(exactMatch || null);
  }, [selectedOptions, variants]);

  const handleSelectOption = (attribute: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!currentVariant) {
      alert("لطفا همه خصوصیات را انتخاب کنید.");
      return;
    }
    try {
      setLoading(true);
      await addToCart({ variant_id: currentVariant.id, quantity: 1 });
      refreshCart(); // بروزرسانی سبد خرید
      alert("محصول با موفقیت به سبد خرید اضافه شد.");
    } catch {
      alert("خطا در افزودن به سبد خرید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">انتخاب خصوصیات</h2>

      {allAttributes.map((attribute) => {
        const options = initialOptions[attribute] || [];
        const selectedValue = selectedOptions[attribute];

        return (
          <div key={attribute} className="mb-6">
            <div className="font-medium mb-2">{attribute}</div>
            <div className="flex flex-wrap gap-3">
              {options.map((option) => {
                const isSelected = selectedValue === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelectOption(attribute, option)}
                    className={`px-4 py-1 rounded border cursor-pointer transition ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:border-blue-600"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {currentVariant ? (
        <div className="p-4 border rounded bg-gray-50">
          <div className="flex gap-4 items-center">
            {currentVariant.image && (
              <Image
                src={currentVariant.image}
                alt="تصویر محصول"
                width={100}
                height={100}
                className="rounded"
              />
            )}
            <div>
              <p className="font-semibold text-lg">{currentVariant.sku}</p>
              <p className="text-blue-600 font-bold text-xl">
                {currentVariant.price.toLocaleString()} تومان
              </p>
              <p>
                موجودی:{" "}
                {currentVariant.stock > 0 ? (
                  <span className="text-green-600 font-medium">موجود</span>
                ) : (
                  <span className="text-red-500 font-medium">ناموجود</span>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={loading || currentVariant.stock <= 0}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition disabled:opacity-50"
          >
            {loading ? "در حال افزودن..." : "افزودن به سبد خرید"}
          </button>
        </div>
      ) : (
        <p className="text-red-500 mt-4">ویژگی‌های انتخاب شده موجود نیستند.</p>
      )}
    </div>
  );
}
