'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchCategoriesTree } from '@/services/categories/getCategories'
import { Category } from '@/types/category/getCategories'

export default function MobileCategoriesMenu({ onClose }: { onClose: () => void }) {
  const [expandedIds, setExpandedIds] = useState<number[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategoriesTree()
      .then(data => {
        setCategories(data)
        setError(null)
      })
      .catch(() => setError('خطا در دریافت دسته‌بندی‌ها'))
      .finally(() => setLoading(false))
  }, [])

  const toggleExpand = (id: number) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(i => i !== id))
    } else {
      setExpandedIds([...expandedIds, id])
    }
  }

  const renderItems = (items: Category[], level = 0) =>
    items.map(item => (
      <div key={item.id} className={`pr-${level * 4} py-1`}>
        <div className="flex justify-between items-center">
          {/* لینک دسته‌بندی */}
          <Link
            href={`/category/${item.slug || item.id}`}
            onClick={onClose}
            className="text-right text-sm font-medium text-gray-800 hover:text-blue-600"
          >
            {item.name}
          </Link>

          {/* دکمه باز/بستن زیرمجموعه */}
          {item.children?.length > 0 && (
            <button
              onClick={() => toggleExpand(item.id)}
              className="text-sm text-gray-600 px-2"
              aria-label="باز و بسته کردن"
            >
              {expandedIds.includes(item.id) ? '-' : '+'}
            </button>
          )}
        </div>

        {/* رندر زیرمجموعه‌ها */}
        {expandedIds.includes(item.id) && item.children?.length > 0 && (
          <div>{renderItems(item.children, level + 1)}</div>
        )}
      </div>
    ))

  if (loading) return <div>در حال بارگذاری...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return <nav>{renderItems(categories)}</nav>
}
