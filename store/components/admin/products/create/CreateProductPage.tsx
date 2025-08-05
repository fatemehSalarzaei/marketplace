'use client'

import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import ProductBasicInfo from './ProductBasicInfo'
import ProductMediaUploader from '@/components/admin/products/create/ProductMediaUploader'
import AttributeSelector from '@/components/admin/products/create/AttributeSelector'
import VariantManager from '@/components/admin/products/create/VariantManager'
import { createProduct, updateProduct } from '@/services/admin/products/products_save'
import { getAllCategories } from '@/services/admin/categories/categoryService'
import { getBrands } from '@/services/admin/brands/brandService'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'
import { Save, X } from 'lucide-react'
import { Product } from '@/types/admin/products/products_save'

interface GalleryImage {
  id?: number
  image_asset: string
  alt_text?: string
}

interface ProductVideo {
  id?: number
  video_asset: string
  title?: string
  description?: string
}

interface Props {
  product?: Product
}

export default function ProductForm({ product }: Props) {
  const router = useRouter()

  // مقداردهی اولیه دقیق با استخراج id ها و مقداردهی فیلدها
  const defaultValues = product
    ? {
        ...product,
        brand: product.brand?.id || null,
        category: product.category?.id || null,
        status: product.status || '',
        is_active: product.is_active ?? true,
        attribute_values: product.attribute_values || [],
        variants: product.variants || [],
      }
    : {
        attribute_values: [],
        variants: [],
        is_active: true,
        status: '',
        brand: null,
        category: null,
      }

  const methods = useForm({
    defaultValues,
  })

  const { handleSubmit, reset } = methods
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([])
  const [mainImage, setMainImage] = useState<GalleryImage | null>(
    product?.main_image
      ? {
          id: product.main_image.id,
          image_asset:
            typeof product.main_image === 'string'
              ? product.main_image
              : product.main_image.image_asset || '',
          alt_text: product.main_image.alt_text || '',
        }
      : null
  )
  const [gallery, setGallery] = useState<GalleryImage[]>(product?.gallery_images || [])
  const [video, setVideo] = useState<ProductVideo | null>(product?.videos?.[0] || null)

  useEffect(() => {
    const fetchData = async () => {
      const cats = await getAllCategories()
      const brandsRes = await getBrands({ is_active: 'true' })

      setCategories(cats)
      setBrands(brandsRes.results || [])

      if (product) {
        reset({
          ...defaultValues,
          brand: product.brand?.id || null,
          category: product.category?.id || null,
          status: product.status || '',
          is_active: product.is_active ?? true,
          attribute_values: product.attribute_values || [],
          variants: product.variants || [],
        })
      }
    }
    fetchData()
  }, [product, reset])

  const onSubmit = async (data: any) => {
    try {
      const payload: any = {
        ...data,
        slug: data.slug?.trim() || null,
        category: Number(data.category),
        is_active: data.is_active ?? true,
        tags: data.tags ?? [],
        main_image: mainImage?.id || null,
        gallery_images:
          gallery.length > 0
            ? gallery.map((img) => ({
                image_asset: img.id,
                alt_text: img.alt_text || '',
              }))
            : [],
        videos: video
          ? [
              {
                video_asset: video.id,
                title: video.title || '',
                description: video.description || '',
              },
            ]
          : [],
        variants: [],
      }

      // attribute_values
      if (data.attribute_values && data.attribute_values.length > 0) {
        payload.attribute_values = data.attribute_values.map((attr: any) => ({
          id: attr.id,
          attribute: attr.attribute,
          predefined_value: attr.predefined_value,
          value: attr.value,
        }))
      }

      // variants
      if (data.variants && data.variants.length > 0) {
        payload.variants = data.variants.map((variant: any) => {
          const v: any = {
            id: variant.id,
            sku: variant.sku,
            price: Number(variant.price),
            stock: Number(variant.stock ?? 0),
            is_active: !!variant.is_active,
            variant_attributes: [],
            gallery_images: [],
          }

          if (typeof variant.image === 'string') {
            v.image = variant.image
          }

          if (variant.gallery_images && variant.gallery_images.length > 0) {
            v.gallery_images = variant.gallery_images
              .map((img: any) => {
                if (img.id) {
                  return {
                    id: img.id,
                    image_asset: img.id,
                    alt_text: img.alt_text || '',
                  }
                }
                return null
              })
              .filter(Boolean)
          }

          if (variant.variant_attributes && variant.variant_attributes.length > 0) {
            v.variant_attributes = variant.variant_attributes.map((attr: any) => ({
              id: attr.id,
              attribute_value: attr.attribute_value,
            }))
          }

          return v
        })
      }

      let response
      if (product?.id) {
        response = await updateProduct(product.id, payload)
        alert('محصول با موفقیت به‌روزرسانی شد')
      } else {
        response = await createProduct(payload)
        alert('محصول با موفقیت ایجاد شد')
      }

      router.push('/admin/products')
    } catch (error: any) {
      console.error('خطا:', {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      })
      alert(`خطا در ذخیره محصول: ${error.response?.data?.detail || error.message}`)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {product ? 'ویرایش محصول' : 'ایجاد محصول جدید'}
        </h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <ProductBasicInfo
                    categories={categories}
                    brands={brands}
                    errors={methods.formState.errors}
                    register={methods.register}
                    isEdit={!!product}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <AttributeSelector />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <VariantManager />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-10 mt-6 flex flex-col gap-4">
                  <Button type="submit" className="w-full flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" />
                    ذخیره محصول
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => router.push('/admin/products')}
                  >
                    <X className="w-4 h-4" />
                    لغو
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <ProductMediaUploader
                    mainImage={mainImage}
                    setMainImage={setMainImage}
                    gallery={gallery}
                    setGallery={setGallery}
                    video={video}
                    setVideo={setVideo}
                  />
                </CardContent>
              </Card>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
