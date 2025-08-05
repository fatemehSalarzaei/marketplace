"use client";

import ProductFilterSidebar from "@/components/products/ProductFilterSidebar";
import ProductSortBox from "@/components/products/ProductSortBox";
import ProductGrid from "@/components/products/ProductGrid";
import Breadcrumbs from "./Breadcrumbs";
import Products from "@/types/products/product_list";
import { RefObject } from "react";
import { CategoryBreadcrumb } from "@/types/category/category";
interface Props {
  products: Products[];
  observerRef: RefObject<HTMLDivElement>;
  category: CategoryBreadcrumb | null;
  onFilter: (filters: any) => void;
  onSort: (val: string) => void; // ← اضافه شده
}

export default function CategoryPageLayout({
  products,
  observerRef,
  category,
  onFilter,
  onSort,
}: Props) {
  return (
    <div className="w-full px-0 py-6" dir="rtl">
      <Breadcrumbs category={category} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 pr-0">
          <div className="sticky top-0">
            <ProductFilterSidebar onFilter={onFilter} />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="ml-[50px]">
            <ProductSortBox onChange={onSort} />
            {products.length === 0 ? (
              <div className="text-center text-gray-600 mt-10">
                محصولی در این دسته‌بندی یافت نشد.
              </div>
            ) : (
              <>
                <ProductGrid products={products} />
                <div ref={observerRef} className="h-8" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
