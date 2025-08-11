'use client';

import React, { useEffect, useState } from 'react';
import { Element } from '@/types/pageBuilder/pageBuilder';
import { getElements, updateElementsPositions } from '@/services/admin/pageBuilder/pageBuilderService';
import { PencilSquareIcon, Bars3Icon } from '@heroicons/react/24/outline';

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
  onEdit: (element: Element) => void;
  onCreateNew: () => void;
}

const SortableItem = (props: {
  id: number;
  element: Element;
  onEdit: (element: Element) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDragging ? '#bfdbfe' : 'white',
    border: '1px solid #d1d5db',
    borderRadius: 4,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    userSelect: 'none',
  };

  const cellStyle = {
    flex: 1,
    textAlign: 'center' as const,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* هندل فقط این آیکون است */}
      <div
        {...attributes}
        {...listeners}
        style={{ cursor: 'grab', paddingRight: 8, display: 'flex', alignItems: 'center' }}
        title="جابجایی"
      >
        <Bars3Icon className="w-6 h-6 text-gray-400" />
      </div>

      <div style={cellStyle}>{props.element.name}</div>
      <div style={cellStyle}>{props.element.display_title}</div>
      <div style={cellStyle}>{props.element.element_type}</div>
      <div style={cellStyle}>{props.element.position}</div>
      <div style={cellStyle}>{props.element.is_active ? 'بله' : 'خیر'}</div>
      <div style={{ ...cellStyle, flex: 1 }}>
        <button
          onClick={() => props.onEdit(props.element)}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          title="ویرایش"
          type="button"
        >
          <PencilSquareIcon className="w-5 h-5" />
          ویرایش
        </button>
      </div>
    </div>
  );
};

export default function ElementList({ onEdit, onCreateNew }: Props) {
  const [elements, setElements] = useState<Element[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    getElements()
      .then(setElements)
      .catch(() => setError('خطا در دریافت المان‌ها'))
      .finally(() => setLoading(false));
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = elements.findIndex((el) => el.id === active.id);
      const newIndex = elements.findIndex((el) => el.id === over.id);

      const newElements = arrayMove(elements, oldIndex, newIndex)
        .map((el, index) => ({
          ...el,
          position: index + 1,
        }));

      setElements(newElements);
      setSaving(true);

      try {
        await updateElementsPositions(newElements);
      } catch (e) {
        alert('خطا در ذخیره موقعیت‌ها در سرور');
        console.error(e);
      } finally {
        setSaving(false);
      }
    }
  };

  return (
     <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-4 flex justify-end">
        <button
          onClick={onCreateNew}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          type="button"
        >
          افزودن المان جدید
        </button>
      </div>

      {loading && <div>در حال بارگذاری...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {saving && <div className="text-green-600 mb-2">در حال ذخیره موقعیت‌ها...</div>}

      {/* هدر جدول */}
      <div className="flex border border-gray-300 rounded mb-2 bg-gray-100 font-semibold text-center">
        <div className="flex-0 px-4 py-2 w-10"></div> {/* جای خالی برای هندل درگ */}
        <div className="flex-1 px-4 py-2">نام</div>
        <div className="flex-1 px-4 py-2">عنوان نمایشی</div>
        <div className="flex-1 px-4 py-2">نوع المان</div>
        <div className="flex-1 px-4 py-2">موقعیت</div>
        <div className="flex-1 px-4 py-2">فعال</div>
        <div className="flex-1 px-4 py-2">عملیات</div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={elements.map((el) => el.id)} strategy={verticalListSortingStrategy}>
          {elements.map((el) => (
            <SortableItem key={el.id} id={el.id} element={el} onEdit={onEdit} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
