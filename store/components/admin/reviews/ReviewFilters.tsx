'use client'

import React, { useEffect, useState } from 'react'
import { getProducts } from '@/services/admin/products/products_save'
import { Product } from '@/types/products/product'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

interface Props {
  setFilters: (filters: { product?: string; rating?: string }) => void
}

export default function ReviewFilters({ setFilters }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [product, setProduct] = useState('')
  const [rating, setRating] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts()
      setProducts(res.results || res)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    setFilters({ product, rating })
  }, [product, rating])

  return (
    <div className="flex gap-4 mb-4">
      <Select value={product} onValueChange={setProduct}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="محصول" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">همه</SelectItem>
          {products.map((p) => (
            <SelectItem key={p.id} value={p.id.toString()}>
              {p.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={rating} onValueChange={setRating}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="امتیاز" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">همه</SelectItem>
          {[1, 2, 3, 4, 5].map((r) => (
            <SelectItem key={r} value={r.toString()}>
              {r} ستاره
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
