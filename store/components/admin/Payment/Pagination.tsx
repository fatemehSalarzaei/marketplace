import React from 'react'

interface Props {
  currentPage: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalItems, pageSize, onPageChange }: Props) {
  const totalPages = Math.ceil(totalItems / pageSize)

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center mt-4 gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 rounded border bg-gray-200 disabled:opacity-50"
      >
        قبلی
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border ${
            page === currentPage ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 rounded border bg-gray-200 disabled:opacity-50"
      >
        بعدی
      </button>
    </div>
  )
}
