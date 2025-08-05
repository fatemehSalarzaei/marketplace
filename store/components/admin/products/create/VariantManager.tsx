'use client'

import React, { useEffect, useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { getVariantAttributes } from '@/services/admin/attribute/attributeService'
import { Attribute } from '@/types/admin/attribute/attribute'

export default function VariantManager() {
  const { control, register, watch, setValue } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'variants' })
  const [variantAttributes, setVariantAttributes] = useState<Attribute[]>([])

  useEffect(() => {
    getVariantAttributes().then(res => {
      const raw = Array.isArray(res.data) ? res.data : res.data.results
      const normalized = raw.map(attr => ({
        ...attr,
        allows_free_text: !attr.use_predefined_values,
        options: attr.values || [],
      }))
      setVariantAttributes(normalized)
    })
  }, [])

  const addVariant = () => {
    append({
      sku: '',
      price: 0,
      stock: 0,
      is_active: true,
      variant_attributes: [],
    })
  }

  const updateAttribute = (variantIndex: number, attrIndex: number, key: 'attribute' | 'attribute_value', value: string) => {
    const current = watch(`variants.${variantIndex}.variant_attributes`) || []
    const updated = [...current]
    updated[attrIndex] = { ...updated[attrIndex], [key]: value }
    setValue(`variants.${variantIndex}.variant_attributes`, updated)
  }

  const addAttributeToVariant = (variantIndex: number) => {
    const current = watch(`variants.${variantIndex}.variant_attributes`) || []
    setValue(`variants.${variantIndex}.variant_attributes`, [...current, { attribute: '', attribute_value: '' }])
  }

  const removeAttributeFromVariant = (variantIndex: number, attrIndex: number) => {
    const current = watch(`variants.${variantIndex}.variant_attributes`) || []
    const filtered = current.filter((_, i) => i !== attrIndex)
    setValue(`variants.${variantIndex}.variant_attributes`, filtered)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">مدیریت تنوع‌های محصول</h2>

      <button type="button" onClick={addVariant} className="btn-primary mb-4">
        افزودن تنوع جدید
      </button>

      {fields.map((variant, index) => {
        const selectedAttrs = watch(`variants.${index}.variant_attributes`) || []

        return (
          <div key={variant.id} className="border rounded p-4 space-y-4">
            <div>
              <label>SKU</label>
              <input
                {...register(`variants.${index}.sku` as const)}
                defaultValue={variant.sku}
                className="input"
              />
            </div>
            <div>
              <label>قیمت</label>
              <input
                type="number"
                {...register(`variants.${index}.price` as const, { valueAsNumber: true })}
                defaultValue={variant.price}
                className="input"
              />
            </div>
            <div>
              <label>موجودی</label>
              <input
                type="number"
                {...register(`variants.${index}.stock` as const, { valueAsNumber: true })}
                defaultValue={variant.stock}
                className="input"
              />
            </div>
            <div>
              <label>فعال / غیرفعال</label>
              <input
                type="checkbox"
                {...register(`variants.${index}.is_active` as const)}
                defaultChecked={variant.is_active}
              />
            </div>

            {/* Variant Attributes */}
            <div className="space-y-2">
              <label className="block">خصوصیات تنوع</label>
              {selectedAttrs.map((attr, attrIndex) => {
                const attrDef = variantAttributes.find(a => a.id === Number(attr.attribute))

                return (
                  <div key={attrIndex} className="flex flex-wrap items-center gap-2">
                    <select
                      className="input"
                      value={attr.attribute}
                      onChange={e =>
                        updateAttribute(index, attrIndex, 'attribute', e.target.value)
                      }
                    >
                      <option value="">انتخاب خصوصیت</option>
                      {variantAttributes.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>

                    {attrDef ? (
                      attrDef.allows_free_text ? (
                        <input
                          type="text"
                          className="input"
                          value={attr.attribute_value}
                          onChange={e =>
                            updateAttribute(index, attrIndex, 'attribute_value', e.target.value)
                          }
                          placeholder="مقدار دلخواه"
                        />
                      ) : (
                        <select
                          className="input"
                          value={attr.attribute_value}
                          onChange={e =>
                            updateAttribute(index, attrIndex, 'attribute_value', e.target.value)
                          }
                        >
                          <option value="">انتخاب مقدار</option>
                          {attrDef.options.map(opt => (
                            <option key={opt.id} value={opt.id}>{opt.value}</option>
                          ))}
                        </select>
                      )
                    ) : null}

                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => removeAttributeFromVariant(index, attrIndex)}
                    >
                      حذف
                    </button>
                  </div>
                )
              })}

              <button
                type="button"
                className="btn-secondary"
                onClick={() => addAttributeToVariant(index)}
              >
                افزودن خصوصیت
              </button>
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="btn-delete mt-4"
            >
              حذف تنوع
            </button>
          </div>
        )
      })}
    </div>
  )
}