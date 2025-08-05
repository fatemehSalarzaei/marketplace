"use client";

import Link from "next/link";

export interface CategoryBreadcrumb {
  id: number;
  name: string;
  slug: string;
  parent: CategoryBreadcrumb | null;
}

interface BreadcrumbsProps {
  category: CategoryBreadcrumb | null;
}

function buildBreadcrumbArray(
  category: CategoryBreadcrumb | null
): CategoryBreadcrumb[] {
  const arr: CategoryBreadcrumb[] = [];
  let current = category;
  while (current) {
    arr.unshift(current);
    current = current.parent;
  }
  return arr;
}

export default function Breadcrumbs({ category }: BreadcrumbsProps) {
  if (!category) return null;

  const breadcrumbArray = buildBreadcrumbArray(category);

  return (
    <nav
      aria-label="breadcrumb"
      className="mb-4 font-iranyekan text-sm text-gray-700"
    >
      <ol className="flex gap-2">
        <li>
          <Link
            href="/"
            className="hover:text-primary transition-colors duration-200"
          >
            خانه
          </Link>
          <span className="mx-1">/</span>
        </li>
        {/* <li>
          <Link
            href="/categories"
            className="hover:text-primary transition-colors duration-200"
          >
            دسته‌بندی‌ها
          </Link>
          <span className="mx-1">/</span>
        </li> */}
        {breadcrumbArray.map((cat, index) => (
          <li key={cat.id} className="truncate max-w-xs">
            {index === breadcrumbArray.length - 1 ? (
              <span aria-current="page" className="font-bold text-primary">
                {cat.name}
              </span>
            ) : (
              <>
                <Link
                  href={`/category/${cat.slug}`}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {cat.name}
                </Link>
                <span className="mx-1">/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
