'use client';

import React from 'react'
import { ElementItem } from '@/types/admin/pageBuilder/pageBuilder'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Props {
  items: ElementItem[]
  onEdit: (item: ElementItem) => void
  onDelete: (id: number) => void
}

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  borderBottom: '1px solid #ddd',
  userSelect: 'none',
}

const cellStyle = {
  flex: 1,
  textAlign: 'center' as const,
}

const actionCellStyle = {
  ...cellStyle,
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  gap: 8,
}

export default function ElementItemList({ items, onEdit, onDelete }: Props) {
  return (
    <div style={{ border: '1px solid #d1d5db', borderRadius: 4, overflow: 'hidden', marginTop: 10 }}>
      {/* Header */}
      <div
        style={{
          ...rowStyle,
          backgroundColor: '#f3f4f6',
          fontWeight: '600',
          borderBottom: '2px solid #d1d5db',
        }}
      >
        <div style={cellStyle}>عنوان</div>
        <div style={cellStyle}>موقعیت</div>
        <div style={cellStyle}>Object ID</div>
        <div style={cellStyle}>فعال</div>
        <div style={actionCellStyle}>عملیات</div>
      </div>

      {/* Rows */}
      {items.length === 0 && (
        <div style={{ ...rowStyle, justifyContent: 'center' }}>
          آیتمی وجود ندارد
        </div>
      )}

      {items.map(item => (
        <div key={item.id} style={rowStyle}>
          <div style={cellStyle}>{item.title || '-'}</div>
          <div style={cellStyle}>{item.position}</div>
          <div style={cellStyle}>{item.object_id ?? '-'}</div>
          <div style={cellStyle}>{item.is_active ? 'بلی' : 'خیر'}</div>
          <div style={actionCellStyle}>
            <button
              onClick={() => onEdit(item)}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              title="ویرایش"
              type="button"
            >
              <PencilSquareIcon className="w-5 h-5" />
              ویرایش
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="text-red-600 hover:text-red-800 flex items-center gap-1"
              title="حذف"
              type="button"
            >
              <TrashIcon className="w-5 h-5" />
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
