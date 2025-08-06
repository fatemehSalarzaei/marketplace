'use client'

import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { getProductAttributes } from '@/services/admin/attribute/attributeService'
import { Attribute } from '@/types/admin/attribute/attribute'

export default function AttributeSelector() {
  const { setValue, watch } = useFormContext()

  const [attributes, setAttributes] = useState<Attribute[]>([])
  const selectedAttributes = watch('attribute_values') || []
  const [editingIndexes, setEditingIndexes] = useState<number[]>([])
  const [errors, setErrors] = useState<Record<number, string>>({})

  useEffect(() => {
    getProductAttributes().then(res => {
      const raw = Array.isArray(res.data) ? res.data : res.data.results
      const enriched = raw.map(attr => ({
        ...attr,
        allows_free_text: !attr.use_predefined_values,
        options: attr.values || [],
      }))
      setAttributes(enriched)
    })
  }, [])

  const addAttribute = () => {
    const updated = [...selectedAttributes, { attribute: null, value: '', predefined_value: null }]
    setValue('attribute_values', updated)
    setEditingIndexes([...editingIndexes, updated.length - 1])
  }

  const removeAttribute = (index: number) => {
    const updated = selectedAttributes.filter((_, i) => i !== index)
    setValue('attribute_values', updated)
    setEditingIndexes(editingIndexes.filter(i => i !== index))
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[index]
      return newErrors
    })
  }

  const updateAttribute = (
    index: number,
    key: 'attribute' | 'value' | 'predefined_value',
    value: string | number
  ) => {
    const updated = [...selectedAttributes]

    if (key === 'attribute' || key === 'predefined_value') {
      updated[index] = {
        ...updated[index],
        [key]: value === '' ? null : parseInt(value as string, 10),
        ...(key === 'attribute' ? { predefined_value: null, value: '' } : {}),
      }
    } else {
      updated[index] = {
        ...updated[index],
        [key]: value,
      }
    }

    setValue('attribute_values', updated)

    if (!editingIndexes.includes(index)) {
      setEditingIndexes([...editingIndexes, index])
    }

    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[index]
      return newErrors
    })
  }

  const saveAttribute = (index: number) => {
    const attr = selectedAttributes[index]
    if (!attr.attribute || (!attr.value && !attr.predefined_value)) {
      setErrors(prev => ({
        ...prev,
        [index]: 'لطفاً خصوصیت و مقدار را وارد کنید.',
      }))
      return
    }
    setEditingIndexes(editingIndexes.filter(i => i !== index))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">خصوصیات عمومی محصول</h2>

      {selectedAttributes.map((attr, index) => {
        const attrDef = attributes.find(a => a.id === Number(attr.attribute))
        const isEditing = editingIndexes.includes(index)
        const error = errors[index]

        return (
          <div key={index} className="flex flex-wrap items-center gap-2 w-full">
            <select
              className="input flex-1"
              value={attr.attribute ?? ''}
              onChange={e => updateAttribute(index, 'attribute', e.target.value)}
              disabled={!isEditing}
            >
              <option value="">انتخاب خصوصیت</option>
              {attributes.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>

            {attrDef ? (
              attrDef.use_predefined_values ? (
                <select
                  className="input flex-1"
                  value={attr.predefined_value ?? ''}
                  onChange={e => updateAttribute(index, 'predefined_value', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">انتخاب مقدار</option>
                  {attrDef.options.map(opt => (
                    <option key={opt.id} value={opt.id}>
                      {opt.value}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="input flex-1"
                  value={attr.value || ''}
                  onChange={e => updateAttribute(index, 'value', e.target.value)}
                  disabled={!isEditing}
                  placeholder="مقدار دلخواه"
                />
              )
            ) : (
              <input
                type="text"
                className="input flex-1"
                value={attr.value || ''}
                onChange={e => updateAttribute(index, 'value', e.target.value)}
                disabled={!isEditing}
                placeholder="مقدار"
              />
            )}

            {isEditing ? (
              <button type="button" onClick={() => saveAttribute(index)} className="btn-primary">
                ذخیره
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setEditingIndexes([...editingIndexes, index])}
                className="btn-secondary"
              >
                ویرایش
              </button>
            )}

            <button type="button" onClick={() => removeAttribute(index)} className="btn-delete">
              حذف
            </button>

            {error && <p className="text-red-500 text-sm w-full">{error}</p>}
          </div>
        )
      })}

      <button type="button" onClick={addAttribute} className="btn-primary">
        افزودن خصوصیت
      </button>
    </div>
  )
}
