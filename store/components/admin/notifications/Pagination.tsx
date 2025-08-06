'use client'

import React from 'react'

interface PaginationProps {
  total: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  page,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / pageSize)

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center mt-6 gap-2">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded border ${
            page === p
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  )
}
