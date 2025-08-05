'use client'

import React, { useState, useEffect } from 'react'
import { getVideos, VideoAsset } from '@/services/admin/videoAsset/videoAssetService'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelect: (video: VideoAsset | VideoAsset[]) => void
  multiple?: boolean
}

export default function VideoAssetPicker({ isOpen, onClose, onSelect, multiple = false }: Props) {
  const [videos, setVideos] = useState<VideoAsset[]>([])
  const [selected, setSelected] = useState<VideoAsset[]>([])

  useEffect(() => {
    if (!isOpen) return
    
    const fetchData = async () => {
      try {
        const data = await getVideos()
        setVideos(data.results || [])
      } catch (error) {
        console.error('Error fetching videos:', error)
      }
    }
    fetchData()
  }, [isOpen])

  const handleSelect = (video: VideoAsset) => {
    if (multiple) {
      setSelected(prev =>
        prev.some(v => v.id === video.id) 
          ? prev.filter(v => v.id !== video.id) 
          : [...prev, video]
      )
    } else {
      onSelect(video)
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
          <h2 className="text-lg font-semibold">انتخاب ویدیو</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map(video => (
            <div
              key={video.id}
              className={`border p-2 cursor-pointer rounded-lg transition-all ${
                selected.some(v => v.id === video.id) 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-300 hover:border-blue-300'
              }`}
              onClick={() => handleSelect(video)}
            >
              <video
                src={video.video}
                controls
                className="w-full h-40 object-cover rounded"
              />
              <div className="mt-2">
                <p className="font-medium">{video.title || 'بدون عنوان'}</p>
                {video.description && (
                  <p className="text-sm text-gray-600">{video.description}</p>
                )}
              </div>
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