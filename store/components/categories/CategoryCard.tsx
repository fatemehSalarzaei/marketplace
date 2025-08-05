// components/categories/CategoryCard.tsx
"use client";

import Link from "next/link";
import { Category } from "@/types/category/getCategories";

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition">
      <h2 className="text-lg font-semibold mb-2">{category.name}</h2>

      {category.children.length > 0 ? (
        <ul className="list-disc pr-4 text-sm text-gray-700 space-y-1">
          {category.children.map((child) => (
            <li key={child.id}>
              <Link
                href={`/category/${child.slug}`}
                className="hover:text-blue-600 transition"
              >
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-sm">زیر‌دسته‌ای ندارد</p>
      )}
    </div>
  );
}
