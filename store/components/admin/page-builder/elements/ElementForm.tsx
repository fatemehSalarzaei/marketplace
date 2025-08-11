'use client';

import React, { useState, useEffect } from 'react';
import { Element, ElementType } from '@/types/pageBuilder/pageBuilder';
import { getElementTypes } from '@/services/admin/pageBuilder/pageBuilderService';

interface Props {
  element?: Element;
  onSubmit: (data: Partial<Element>) => void;
}

const DISPLAY_STYLES = [
  'slider', 'grid', 'list', 'carousel', 'masonry', 'tabs', 'accordion',
  'html', 'banner', 'product_highlight', 'video', 'text', 'gallery', 'countdown', 'testimonial', 'category_list'
];

const SECTIONS = ['header', 'middle', 'footer'];

export default function ElementForm({ element, onSubmit }: Props) {
  const [formData, setFormData] = useState<Partial<Element>>({
    name: element?.name || '',
    display_title: element?.display_title || '',
    element_type: element?.element_type || '',
    position: element?.position || 0,
    display_style: element?.display_style || 'grid',
    section: element?.section || 'middle',
    is_active: element?.is_active ?? true,
    start_at: element?.start_at || '',
    end_at: element?.end_at || '',
    html_content: element?.html_content || '',
  });

  const [elementTypes, setElementTypes] = useState<ElementType[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [errorTypes, setErrorTypes] = useState<string | null>(null);

  useEffect(() => {
    setLoadingTypes(true);
    getElementTypes()
      .then(data => setElementTypes(data))
      .catch(() => setErrorTypes('خطا در بارگذاری نوع‌های المان'))
      .finally(() => setLoadingTypes(false));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // ارسال رشته خالی برای تاریخ‌های انتخاب نشده
    const preparedData = {
      ...formData,
      start_at: formData.start_at ? formData.start_at : null,
      end_at: formData.end_at ? formData.end_at : null,
    };

    onSubmit(preparedData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 font-semibold text-gray-700">نام المان:</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="نام المان"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="display_title" className="mb-1 font-semibold text-gray-700">عنوان نمایشی:</label>
          <input
            id="display_title"
            name="display_title"
            value={formData.display_title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="عنوان نمایشی"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="element_type" className="mb-1 font-semibold text-gray-700">نوع المان (مدل):</label>
          {loadingTypes ? (
            <div>در حال بارگذاری نوع‌ها...</div>
          ) : errorTypes ? (
            <div className="text-red-600">{errorTypes}</div>
          ) : (
            <select
              id="element_type"
              name="element_type"
              value={formData.element_type}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">انتخاب کنید</option>
              {elementTypes.map((et) => (
                <option key={et.id} value={et.name}>
                  {et.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="position" className="mb-1 font-semibold text-gray-700">موقعیت:</label>
          <input
            id="position"
            name="position"
            type="number"
            value={formData.position}
            onChange={handleChange}
            min={0}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="display_style" className="mb-1 font-semibold text-gray-700">نوع نمایش:</label>
          <select
            id="display_style"
            name="display_style"
            value={formData.display_style}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {DISPLAY_STYLES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="section" className="mb-1 font-semibold text-gray-700">بخش صفحه:</label>
          <select
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {SECTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-3 rtl:space-x-reverse mt-6 sm:mt-0">
          <input
            id="is_active"
            name="is_active"
            type="checkbox"
            checked={formData.is_active}
            onChange={handleChange}
            className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="is_active" className="font-semibold text-gray-700 cursor-pointer select-none">
            فعال
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="start_at" className="mb-1 font-semibold text-gray-700">تاریخ شروع:</label>
          <input
            id="start_at"
            name="start_at"
            type="datetime-local"
            value={formData.start_at}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="end_at" className="mb-1 font-semibold text-gray-700">تاریخ پایان:</label>
          <input
            id="end_at"
            name="end_at"
            type="datetime-local"
            value={formData.end_at}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="html_content" className="mb-1 font-semibold text-gray-700">محتوای HTML:</label>
        <textarea
          id="html_content"
          name="html_content"
          value={formData.html_content}
          onChange={handleChange}
          rows={5}
          className="border border-gray-300 rounded-md px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="محتوای HTML را اینجا وارد کنید..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
      >
        ذخیره المان
      </button>
    </form>
  );
}
