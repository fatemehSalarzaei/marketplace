'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'

export default function ProductDescriptionsForm() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()

  const shortDescription = watch('short_description')
  const longDescription = watch('long_description')

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* ویرایشگر توضیحات کوتاه */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          توضیحات کوتاه
        </label>
        <Editor
          id="short_description_editor"
          apiKey="dc9gjuwjvvsyo64h1jo64n90l8w9bnzwyq03z1ae2r7aysn2"
          value={shortDescription}
          init={{
            height: 200,
            menubar: false,
            plugins: ['link', 'lists', 'autolink', 'preview'],
            toolbar:
              'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link preview',
            directionality: 'rtl',
            language: 'fa',
          }}
          onEditorChange={(content) =>
            setValue('short_description', content, {
              shouldValidate: true,
            })
          }
        />
        {errors.short_description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.short_description.message as string}
          </p>
        )}
      </div>

      {/* ویرایشگر توضیحات کامل */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          توضیحات کامل
        </label>
        <Editor
          id="long_description_editor"
          apiKey="dc9gjuwjvvsyo64h1jo64n90l8w9bnzwyq03z1ae2r7aysn2"
          value={longDescription}
          init={{
            height: 300,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'preview', 'anchor', 'searchreplace', 'visualblocks',
              'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
            ],
            toolbar:
              'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            directionality: 'rtl',
            language: 'fa',
          }}
          onEditorChange={(content) =>
            setValue('long_description', content, {
              shouldValidate: true,
            })
          }
        />
        {errors.long_description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.long_description.message as string}
          </p>
        )}
      </div>
    </div>
  )
}
