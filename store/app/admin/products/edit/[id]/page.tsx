'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import CreateProductPage from "@/components/admin/products/create/CreateProductPage"
import { getProduct } from '@/services/admin/products/products_save'
import { Product } from '@/types/admin/products/products_save'

export default function EditProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getProduct(Number(id))
      .then((data) => {
        setProduct(data.data)
        setLoading(false)
      })
      .catch((err) => {
        setError('خطا در دریافت اطلاعات محصول')
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>در حال بارگذاری...</p>
  if (error) return <p>{error}</p>
  if (!product) return <p>محصول پیدا نشد</p>

  return <CreateProductPage product={product} />
}
