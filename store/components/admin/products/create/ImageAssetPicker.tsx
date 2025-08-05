'use client'

import React, { useState, useEffect } from 'react'
import { getImages, ImageAsset } from '@/services/admin/imageAsset/imageAssetService'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelect: (image: ImageAsset | ImageAsset[]) => void
  multiple?: boolean
}

export default function ImageAssetPicker({ isOpen, onClose, onSelect, multiple = false }: Props) {
  const [images, setImages] = useState<ImageAsset[]>([])
  const [selected, setSelected] = useState<ImageAsset[]>([])

  useEffect(() => {
    if (!isOpen) return
    
    const fetchData = async () => {
      try {
        const data = await getImages()
        setImages(data.results || [])
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    }
    fetchData()
  }, [isOpen])

  const handleSelect = (image: ImageAsset) => {
    if (multiple) {
      setSelected(prev =>
        prev.some(i => i.id === image.id) 
          ? prev.filter(i => i.id !== image.id) 
          : [...prev, image]
      )
    } else {
      onSelect(image)
      onClose()
    }
  }

  const handleConfirm = () => {
    onSelect(selected)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">انتخاب تصویر</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map(image => (
            <div
              key={image.id}
              className={`border p-2 cursor-pointer rounded-lg transition-all ${
                selected.some(i => i.id === image.id) 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-300 hover:border-blue-300'
              }`}
              onClick={() => handleSelect(image)}
            >
              <img 
                src={image.image} 
                alt={image.alt_text || 'تصویر'} 
                className="w-full h-32 object-cover rounded"
              />
              <p className="text-sm mt-2 truncate">{image.title || 'بدون عنوان'}</p>
            </div>
          ))}
        </div>

        {multiple && (
          <div className="flex justify-end mt-4 gap-2">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              انصراف
            </button>
            <button 
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={selected.length === 0}
            >
              انتخاب ({selected.length})
            </button>
          </div>
        )}
      </div>
    </div>
  )
}