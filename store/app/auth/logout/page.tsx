'use client'

import { useEffect } from 'react'
import { logoutUser } from '@/services/auth/logout'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const performLogout = async () => {
      await logoutUser()

      // رفرش صفحه برای پاک شدن اطلاعات قبلی
      router.replace('/')      // ریدایرکت به صفحه اصلی
      router.refresh()         // re-render صفحه اصلی
    }

    performLogout()
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-600 text-lg">در حال خروج از حساب کاربری...</p>
    </div>
  )
}
