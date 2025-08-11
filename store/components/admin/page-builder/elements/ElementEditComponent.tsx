'use client'

import React, { useState, useEffect } from 'react'
import ElementForm from './ElementForm'
import ElementItemForm from './ElementItemForm'
import ElementItemList from './ElementItemList'
import { Element, ElementItem } from '@/types/admin/pageBuilder/pageBuilder'
import {
  getElementById,
  getElementItems,
  updateElement,
  createElementItem,
  updateElementItem,
  deleteElementItem,
} from '@/services/admin/pageBuilder/pageBuilderService'

interface Props {
  elementId: number
}

export default function ElementEditComponent({ elementId }: Props) {
  const [element, setElement] = useState<Element | null>(null)
  const [items, setItems] = useState<ElementItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<Partial<ElementItem> | null>(null)
  const [itemFormVisible, setItemFormVisible] = useState(false)

  async function fetchElementAndItems() {
    setLoading(true)
    try {
      const elData = await getElementById(elementId)
      const itemsData = await getElementItems(elementId)
      setElement(elData)
      setItems(itemsData)
      setError(null)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchElementAndItems()
  }, [elementId])

  async function handleElementSubmit(data: Partial<Element>) {
    try {
      const updated = await updateElement(elementId, data)
      setElement(updated)
      alert('ویرایش المان با موفقیت انجام شد')
    } catch (e: any) {
      alert(e.message)
    }
  }

  async function handleItemSubmit(data: Partial<ElementItem>) {
    try {
      if (!data.element) {
        data.element = elementId;
      }
      if (data.id) {
        await updateElementItem(data.id, data)
      } else {
        // در ایجاد آیتم جدید حتما باید elementId را بفرستیم
        await createElementItem({ ...data, element: elementId })
      }
      await fetchElementAndItems()
      setItemFormVisible(false)
      setEditingItem(null)
    } catch (e: any) {
      alert(e.message)
    }
  }

  async function handleItemDelete(id: number) {
    if (!confirm('آیا از حذف این آیتم مطمئن هستید؟')) return
    try {
      await deleteElementItem(id)
      await fetchElementAndItems()
    } catch (e: any) {
      alert(e.message)
    }
  }

  function handleItemEdit(item: ElementItem) {
    setEditingItem(item)
    setItemFormVisible(true)
  }

  function handleAddNewItem() {
    setEditingItem(null)
    setItemFormVisible(true)
  }

  if (loading) return <div>در حال بارگذاری...</div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!element) return <div>المان یافت نشد</div>

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">ویرایش المان: {element.name}</h2>
        <ElementForm element={element} onSubmit={handleElementSubmit} />
      </section>

      <section>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">آیتم‌های المان</h3>
          <button
            onClick={handleAddNewItem}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            افزودن آیتم جدید
          </button>
        </div>

        {itemFormVisible && (
          <ElementItemForm
          elementId={elementId}  // این خط اضافه شود
          item={editingItem || undefined}
          onSubmit={handleItemSubmit}
          onCancel={() => {
            setItemFormVisible(false)
            setEditingItem(null)
          }}
        />
        )}

        <ElementItemList
          items={items}
          onEdit={handleItemEdit}
          onDelete={handleItemDelete}
        />
      </section>
    </div>
  )
}
