'use client';

import React, { useState, useEffect } from 'react';
import { ElementItem } from '@/types/admin/pageBuilder/pageBuilder';
import { PencilSquareIcon, TrashIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { updateElementItemsPositions } from '@/services/admin/pageBuilder/pageBuilderService';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

interface Props {
  items: ElementItem[];
  onEdit: (item: ElementItem) => void;
  onDelete: (id: number) => void;
}

const SortableItem = ({ id, item, onEdit, onDelete }: {
  id: number;
  item: ElementItem;
  onEdit: (item: ElementItem) => void;
  onDelete: (id: number) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDragging ? '#bfdbfe' : 'white',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    userSelect: 'none' as const,
  };

  const cellStyle = { flex: 1, textAlign: 'center' as const };
  const actionCellStyle = { ...cellStyle, display: 'flex', justifyContent: 'center', gap: 8 };

  return (
    <div ref={setNodeRef} style={style}>
      <div {...attributes} {...listeners} style={{ cursor: 'grab', paddingRight: 8 }}>
        <Bars3Icon className="w-5 h-5 text-gray-400" />
      </div>
      <div style={cellStyle}>{item.title || '-'}</div>
      <div style={cellStyle}>{item.position}</div>
      <div style={cellStyle}>
        {item.object_data?.name || item.object_data?.str || item.object_id || '-'}
      </div>
      <div style={cellStyle}>{item.is_active ? 'بله' : 'خیر'}</div>
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
  );
};

export default function ElementItemList({ items: initialItems, onEdit, onDelete }: Props) {
  const [items, setItems] = useState<ElementItem[]>(initialItems);
  const [saving, setSaving] = useState(false);

  // وقتی props.items تغییر کند، state را هم آپدیت کن (مهم)
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((it) => it.id === active.id);
      const newIndex = items.findIndex((it) => it.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex)
        .map((it, index) => ({ ...it, position: index + 1 }));

      setItems(newItems);
      setSaving(true);
      try {
        await updateElementItemsPositions(newItems);
      } catch (e) {
        alert('خطا در ذخیره موقعیت‌ها در سرور');
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div className="border border-gray-300 rounded overflow-hidden mt-4 shadow-sm">
      <div className="flex bg-gray-100 font-semibold border-b border-gray-300">
        <div className="w-10"></div>
        <div className="flex-1 text-center py-2">عنوان</div>
        <div className="flex-1 text-center py-2">موقعیت</div>
        <div className="flex-1 text-center py-2">آیتم مرتبط</div>
        <div className="flex-1 text-center py-2">فعال</div>
        <div className="flex-1 text-center py-2">عملیات</div>
      </div>

      {saving && (
        <div className="text-green-600 text-center py-2 font-semibold bg-green-50">
          در حال ذخیره موقعیت‌ها...
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((it) => it.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
