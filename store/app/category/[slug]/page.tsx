"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { getCategoryProducts } from "@/services/products/getCategoryProducts";
import { getCategoryAncestors } from "@/services/categories/getCategoryAncestors";
import CategoryPageLayout from "@/components/products/CategoryPageLayout";
import Products from "@/types/products/product_list";
import { CategoryBreadcrumb } from "@/types/category/category";
import { getFilteredProducts } from "@/services/products/getFilteredProducts";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Products[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [category, setCategory] = useState<CategoryBreadcrumb | null>(null);
  const [lastFilters, setLastFilters] = useState<any>({});
  const [ordering, setOrdering] = useState("-created_at"); // ✅ مقدار پیش‌فرض

  // فچ اولیه محصولات دسته‌بندی
  const fetchProducts = useCallback(async () => {
    if (!slug) return;
    try {
      const data = await getCategoryProducts(slug, page);
      setProducts((prev) => {
        const newProducts = data.results.filter(
          (p: Products) => !prev.find((prod) => prod.id === p.id)
        );
        return [...prev, ...newProducts];
      });
      setNextUrl(data.next);
    } catch (error) {
      console.error("خطا در دریافت محصولات:", error);
    }
  }, [slug, page]);

  // فچ محصولات با فیلتر و سورت
  const fetchProductsWithFilters = useCallback(
    async (filters: any = {}, orderingParam = ordering) => {
      if (!slug) return;
      try {
        const params = {
          category_slug: slug.toString(),
          page: 1,
          ordering: orderingParam,
          ...filters,
        };
        const data = await getFilteredProducts(params);
        setProducts(data.results);
        setNextUrl(data.next);
        setPage(1);
        setLastFilters(filters); // ذخیره آخرین فیلترها برای سورت مجدد
      } catch (error) {
        console.error("خطا در دریافت محصولات با فیلتر:", error);
      }
    },
    [slug, ordering]
  );

  // فچ اطلاعات دسته‌بندی
  const fetchCategoryAncestors = useCallback(async () => {
    if (!slug) return;
    try {
      const data = await getCategoryAncestors(slug);
      setCategory(data);
    } catch (error) {
      console.error("خطا در دریافت سلسله مراتب دسته‌بندی:", error);
    }
  }, [slug]);

  useEffect(() => {
    fetchProductsWithFilters(); // با فیلتر خالی و سورت پیش‌فرض
    fetchCategoryAncestors();
  }, [slug, fetchProductsWithFilters, fetchCategoryAncestors]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextUrl) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [nextUrl]);

  // وقتی فیلترها اعمال می‌شن
  const handleFilter = (filters: any) => {
    setLastFilters(filters);
    fetchProductsWithFilters(filters);
  };

  // وقتی سورت تغییر می‌کنه
  const handleSortChange = (sortKey: string) => {
    setOrdering(sortKey);
    fetchProductsWithFilters(lastFilters, sortKey);
  };

  return (
    <CategoryPageLayout
      products={products}
      observerRef={observerRef}
      category={category}
      onFilter={handleFilter}
      onSort={handleSortChange} // ارسال به لایه Layout
    />
  );
}
