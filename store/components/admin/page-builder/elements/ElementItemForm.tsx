'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ElementItem, RelatedObject } from '@/types/admin/pageBuilder/pageBuilder';
import { getRelatedObjectsByElement } from '@/services/admin/pageBuilder/pageBuilderService';
import Select from 'react-select';

interface Props {
  elementId: number;
  item?: Partial<ElementItem>;
  onSubmit: (data: Partial<ElementItem>) => void;
  onCancel: () => void;
}

export default function ElementItemForm({ elementId, item = {}, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState<Partial<ElementItem>>({
    title: '',
    position: 0,
    object_id: undefined,
    is_active: true,
  });

  useEffect(() => {
    setFormData({
      title: item.title || '',
      position: item.position || 0,
      object_id: item.object_id,
      is_active: item.is_active ?? true,
      id: item.id,
    });
  }, [item]);

  const [relatedObjects, setRelatedObjects] = useState<RelatedObject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!elementId) return;

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      async function fetchObjects() {
        try {
          const results = await getRelatedObjectsByElement(elementId, searchTerm);
          setRelatedObjects(results);
        } catch {
          setRelatedObjects([]);
        }
      }
      fetchObjects();
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [elementId, searchTerm]);

  const options = relatedObjects.map(obj => ({
    value: obj.id,
    label: obj.name,
  }));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  }

  function handleSelectChange(selectedOption: { value: number; label: string } | null) {
    setFormData(prev => ({
      ...prev,
      object_id: selectedOption ? selectedOption.value : undefined,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">عنوان آیتم:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="عنوان آیتم"
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">موقعیت:</label>
        <input
          type="number"
          name="position"
          value={formData.position}
          onChange={handleChange}
          min={0}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

    

      <div className="flex flex-col md:col-span-2">
        <label className="mb-2 font-semibold text-gray-700">انتخاب آیتم مرتبط:</label>
        <Select
          options={options}
          value={options.find(opt => opt.value === formData.object_id) || null}
          onChange={handleSelectChange}
          placeholder="یک مورد را انتخاب کنید"
          isClearable
          className="text-right"
        />
      </div>

      <div className="flex items-center mt-6 md:mt-0">
        <label className="flex items-center gap-2 cursor-pointer select-none text-gray-700">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="cursor-pointer"
          />
          فعال
        </label>
      </div>

      <div className="md:col-span-2 flex justify-end gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          ذخیره
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 transition"
        >
          انصراف
        </button>
      </div>
    </form>
  );
}
