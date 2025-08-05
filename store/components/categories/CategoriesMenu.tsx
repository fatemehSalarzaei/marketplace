"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Category } from "@/types/category/getCategories";
import { fetchCategoriesTree } from "@/services/categories/getCategories";

export default function CategoriesMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [openPath, setOpenPath] = useState<number[]>([]); // مسیر باز بودن دسته‌ها
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        const data = await fetchCategoriesTree();
        setCategories(data);
        setError(null);
      } catch {
        setError("خطا در دریافت دسته‌بندی‌ها");
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenPath([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (path: number[]) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenPath(path);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenPath([]);
    }, 300);
  };

  const renderCategories = (
    items: Category[],
    level: number = 0,
    parentPath: number[] = []
  ) => {
    return (
      <div
        className={`absolute ${
          level === 0 ? "top-full right-0 mt-1" : "top-0 right-full"
        } w-48 bg-white shadow-lg rounded z-50`}
      >
        {items.map((item) => {
          const currentPath = [...parentPath, item.id];
          const isOpen =
            openPath.length === currentPath.length &&
            currentPath.every((id, i) => id === openPath[i]);

          return (
            <div
              key={item.id}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(currentPath)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={`/category/${item.slug}`}
                className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap font-iranyekan"
                onClick={() => setOpenPath([])}
              >
                {item.name}
              </Link>

              {isOpen &&
                item.children.length > 0 &&
                renderCategories(item.children, level + 1, currentPath)}
            </div>
          );
        })}
      </div>
    );
  };

  if (loading)
    return (
      <div className="p-2 text-gray-500 font-iranyekan">در حال بارگذاری...</div>
    );
  if (error) return <div className="p-2 text-red-600">{error}</div>;

  return (
    <div
      ref={containerRef}
      className="flex gap-6 px-2 h-full items-center select-none relative z-50"
    >
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="relative"
          onMouseEnter={() => handleMouseEnter([cat.id])}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={`/category/${cat.slug}`}
            className="py-2 px-3 block hover:bg-gray-100 rounded"
            onClick={() => setOpenPath([])}
          >
            {cat.name}
          </Link>

          {openPath[0] === cat.id &&
            cat.children.length > 0 &&
            renderCategories(cat.children, 0, [cat.id])}
        </div>
      ))}
    </div>
  );
}
