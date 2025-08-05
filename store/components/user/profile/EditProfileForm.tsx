'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'
import { uploadAvatar } from '@/services/user/profile/uploadAvatar'
import { updateUserProfile } from '@/services/user/profile/updateProfile'
import type { UserProfileResponse, UserProfileUpdateRequest } from '@/types/profile/profile'

type Props = {
  initialData: UserProfileResponse
}

export default function EditProfileForm({ initialData }: Props) {
  // فرم حالت با تایپ کامل (با مقادیر نال مجاز)
  const [profile, setProfile] = useState<UserProfileUpdateRequest>({
    first_name: initialData.first_name ?? null,
    last_name: initialData.last_name ?? null,
    birth_date: initialData.birth_date ?? null,
    national_code: initialData.national_code ?? null,
    email: initialData.email ?? null,
  })

  const [phone] = useState(initialData.phone_number) // فقط نمایش بدون ویرایش
  const [avatar, setAvatar] = useState<string>(initialData.avatar || '/default-avatar.png')

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: value === '' ? null : value,
    }))
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    try {
      const res = await uploadAvatar(file)
      const avatarWithCache = res.avatar + '?t=' + Date.now()
      setAvatar(avatarWithCache)
    } catch (error) {
      console.error('خطا در آپلود آواتار:', error)
      alert('خطا در آپلود آواتار')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateUserProfile(profile)
      alert('اطلاعات با موفقیت ذخیره شد.')
    } catch (error) {
      console.error('خطا در ذخیره اطلاعات:', error)
      alert('خطا در ذخیره اطلاعات')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    window.history.back()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow rtl">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 text-right">ویرایش پروفایل</h2>

      <div className="flex items-center gap-4">
        <Image
          src={avatar}
          alt="آواتار"
          width={80}
          height={80}
          className="rounded-full border object-cover"
          unoptimized
        />
        <div>
          <Label htmlFor="avatar" className="cursor-pointer text-blue-600">
            تغییر عکس پروفایل
          </Label>
          <Input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
            disabled={loading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="first_name" className="block mb-1 text-right">نام</Label>
          <Input
            id="first_name"
            name="first_name"
            value={profile.first_name ?? ''}
            onChange={handleChange}
            className="text-right"
          />
        </div>
        <div>
          <Label htmlFor="last_name" className="block mb-1 text-right">نام خانوادگی</Label>
          <Input
            id="last_name"
            name="last_name"
            value={profile.last_name ?? ''}
            onChange={handleChange}
            className="text-right"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="national_code" className="block mb-1 text-right">کد ملی</Label>
          <Input
            id="national_code"
            name="national_code"
            value={profile.national_code ?? ''}
            onChange={handleChange}
            className="text-right"
          />
        </div>
        <div>
          <Label htmlFor="birth_date" className="block mb-1 text-right">تاریخ تولد</Label>
          <Input
            id="birth_date"
            name="birth_date"
            type="date"
            value={profile.birth_date ?? ''}
            onChange={handleChange}
            className="text-right"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="phone" className="block mb-1 text-right">شماره تماس</Label>
          <Input
            id="phone"
            name="phone"
            value={phone}
            disabled
            className="text-right bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <Label htmlFor="email" className="block mb-1 text-right">ایمیل</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={profile.email ?? ''}
            onChange={handleChange}
            className="text-right"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          onClick={handleCancel}
          className="bg-gray-200 text-black px-6 py-2 rounded-lg hover:bg-gray-300"
          disabled={loading}
        >
          انصراف
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
        >
          {loading ? 'در حال ذخیره…' : 'ذخیره تغییرات'}
        </Button>
      </div>
    </form>
  )
}
