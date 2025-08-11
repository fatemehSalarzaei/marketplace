import React, { useState } from 'react'
import { ElementItem } from '@/types/admin/pageBuilder/pageBuilder'
import ObjectSelector from './ObjectSelector'

interface Props {
  elementType: string
  item?: Partial<ElementItem>
  onSubmit: (data: Partial<ElementItem>) => void
  onCancel: () => void
}

export default function ElementItemForm({ elementType, item = {}, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState<Partial<ElementItem>>({
    title: item.title || '',
    position: item.position || 0,
    object_id: item.object_id,
    is_active: item.is_active ?? true,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: 12, marginTop: 10 }}>
      <div>
        <label>عنوان آیتم:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="عنوان آیتم"
        />
      </div>
      <div>
        <label>موقعیت:</label>
        <input
          type="number"
          name="position"
          value={formData.position}
          onChange={handleChange}
          min={0}
        />
      </div>
      <div>
        <label>انتخاب Object (با توجه به نوع المان):</label>
        <ObjectSelector
          elementType={elementType}
          value={formData.object_id}
          onChange={(val) => setFormData(prev => ({ ...prev, object_id: val }))}
        />
      </div>
      <div>
        <label>فعال:</label>
        <input
          type="checkbox"
          name="is_active"
          checked={formData.is_active}
          onChange={handleChange}
        />
      </div>

      <button type="submit">ذخیره</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>
        انصراف
      </button>
    </form>
  )
}
