// ProductBasicInfo.tsx
'use client'

import React, { useEffect, useState } from 'react'

interface Props {
  categories: { id: number; name: string }[]
  brands: { id: number; name: string }[]
  errors: any
  register: any
  isEdit: boolean
}

export default function ProductBasicInfo({ categories, brands, errors, register, isEdit }: Props) {
  useEffect(() => {
    register('short_description')
    register('long_description')
  }, [register])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">اطلاعات اصلی محصول</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* نام محصول */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            نام محصول
          </label>
          <input
            id="name"
            {...register('name', { required: 'نام محصول الزامی است' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {/* کد محصول */}
        <div>
          <label htmlFor="product_code" className="block text-sm font-medium text-gray-700 mb-1">
            کد محصول
          </label>
          <input
            id="product_code"
            {...register('product_code', { required: 'کد محصول الزامی است' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
          />
          {errors.product_code && (
            <p className="mt-1 text-sm text-red-600">{errors.product_code.message}</p>
          )}
        </div>

        {/* اسلاگ */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            اسلاگ (اختیاری)
          </label>
          <input
            id="slug"
            {...register('slug')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="اگر خالی بگذارید خودکار ساخته می‌شود"
          />
        </div>

        {/* وضعیت */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            وضعیت
          </label>
          <select
            id="status"
            {...register('status', { required: 'وضعیت الزامی است' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">انتخاب کنید</option>
            <option value="draft">پیش‌نویس</option>
            <option value="published">منتشر شده</option>
            <option value="archived">آرشیو شده</option>
          </select>
          {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
        </div>
      </div>

      {/* ویرایشگر توضیحات کوتاه و کامل */}
      {/* فرضا این کامپوننت در جای دیگری هست */}
      {/* <ProductDescriptionsForm /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* وضعیت موجودی */}
        <div>
          <label htmlFor="availability_status" className="block text-sm font-medium text-gray-700 mb-1">
            وضعیت موجودی
          </label>
          <select
            id="availability_status"
            {...register('availability_status', { required: 'وضعیت موجودی الزامی است' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">انتخاب کنید</option>
            <option value="in_stock">موجود در انبار</option>
            <option value="out_of_stock">ناموجود</option>
            <option value="pre_order">پیش‌سفارش</option>
          </select>
          {errors.availability_status && (
            <p className="mt-1 text-sm text-red-600">{errors.availability_status.message}</p>
          )}
        </div>

        {/* حداقل مقدار سفارش */}
        <div>
          <label htmlFor="min_order_quantity" className="block text-sm font-medium text-gray-700 mb-1">
            حداقل مقدار سفارش
          </label>
          <input
            id="min_order_quantity"
            {...register('min_order_quantity', {
              required: 'حداقل مقدار سفارش الزامی است',
              valueAsNumber: true,
              min: { value: 1, message: 'مقدار باید حداقل 1 باشد' },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            min="1"
          />
          {errors.min_order_quantity && (
            <p className="mt-1 text-sm text-red-600">{errors.min_order_quantity.message}</p>
          )}
        </div>

        {/* حداکثر مقدار سفارش */}
        <div>
          <label htmlFor="max_order_quantity" className="block text-sm font-medium text-gray-700 mb-1">
            حداکثر مقدار سفارش
          </label>
          <input
            id="max_order_quantity"
            {...register('max_order_quantity', {
              required: 'حداکثر مقدار سفارش الزامی است',
              valueAsNumber: true,
              min: { value: 1, message: 'مقدار باید حداقل 1 باشد' },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            min="1"
          />
          {errors.max_order_quantity && (
            <p className="mt-1 text-sm text-red-600">{errors.max_order_quantity.message}</p>
          )}
        </div>

        {/* برند */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
            برند
          </label>
          <select
            id="brand"
            {...register('brand', {
              required: 'انتخاب برند الزامی است',
              setValueAs: (v) => (v === '' ? null : Number(v)),
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">انتخاب کنید</option>
            {brands.map((brand) => (
              <option key={brand.id} value={String(brand.id)}>
                {brand.name}
              </option>
            ))}
          </select>
          {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>}
        </div>

        {/* دسته‌بندی */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            دسته‌بندی
          </label>
          <select
            id="category"
            {...register('category', {
              required: 'دسته‌بندی الزامی است',
              setValueAs: (v) => (v === '' ? null : Number(v)),
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">انتخاب کنید</option>
            {categories.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
        </div>

        {/* وضعیت فعال */}
        <div className="flex items-center">
          <input
            {...register('is_active')}
            type="checkbox"
            id="is_active"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="is_active" className="mr-2 block text-sm text-gray-700">
            فعال / غیرفعال
          </label>
        </div>
      </div>
    </div>
  )
}
