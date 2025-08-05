import React, { useState, useRef, useEffect } from 'react'

const notificationsMock = [
  { id: 1, title: 'سفارش جدید ثبت شد', time: '1 ساعت پیش' },
  { id: 2, title: 'تخفیف ویژه برای شما فعال شد', time: '2 روز پیش' },
  { id: 3, title: 'ارسال سفارش شما تایید شد', time: 'دیروز' },
]

export const Notification = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="نمایش نوتیفیکیشن‌ها"
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="p-3 border-b border-gray-100 font-semibold text-gray-800">
            نوتیفیکیشن‌ها
          </div>
          <ul className="max-h-60 overflow-auto">
            {notificationsMock.length === 0 && (
              <li className="p-3 text-center text-gray-500">
                نوتیفیکیشنی وجود ندارد
              </li>
            )}
            {notificationsMock.map((note) => (
              <li
                key={note.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-none"
              >
                <p className="text-sm text-gray-700">{note.title}</p>
                <p className="text-xs text-gray-400">{note.time}</p>
              </li>
            ))}
          </ul>
          <div className="p-2 text-center border-t border-gray-100">
            <button
              onClick={() => alert('رفتن به صفحه نوتیفیکیشن‌ها')}
              className="text-blue-600 hover:underline text-sm"
            >
              مشاهده همه
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
