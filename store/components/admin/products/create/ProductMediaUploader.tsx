"use client"

import React, { useState } from 'react'
import ImageAssetPicker from './ImageAssetPicker'
import VideoAssetPicker from './VideoAssetPicker'
import { ImageAsset, VideoAsset } from '@/types/admin/mediaAssets'

interface GalleryImage {
  id?: number
  image_asset: string
  alt_text?: string
}

interface ProductVideo {
  id?: number
  video_asset: string
  title?: string
  description?: string
}

interface Props {
  mainImage: GalleryImage | null
  setMainImage: (file: GalleryImage | null) => void
  gallery: GalleryImage[]
  setGallery: (files: GalleryImage[]) => void
  video: ProductVideo | null
  setVideo: (file: ProductVideo | null) => void
}

export default function ProductMediaUploader({ 
  mainImage, 
  setMainImage, 
  gallery, 
  setGallery, 
  video, 
  setVideo 
}: Props) {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false)
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false)

  const getImageUrl = (image: GalleryImage | string) => {
    if (typeof image === 'string') return image
    return image.image_asset
  }

  const getVideoUrl = (video: ProductVideo | string) => {
    if (typeof video === 'string') return video
    return video.video_asset
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">گالری تصاویر و ویدیوها</h2>

      {/* Main Image */}
      <div>
        <label>تصویر اصلی</label>
        <div>
          <button 
            type="button" 
            onClick={() => setIsImageDialogOpen(true)} 
            className="btn-secondary"
          >
            انتخاب تصویر
          </button>
          {mainImage && (
            <div className="mt-2 border rounded p-1 w-40 h-28">
              <img
                src={getImageUrl(mainImage)}
                alt={mainImage.alt_text || 'تصویر اصلی'}
                className="w-full h-full object-cover rounded"
              />
            </div>
          )}
        </div>
        <ImageAssetPicker
          isOpen={isImageDialogOpen}
          onClose={() => setIsImageDialogOpen(false)}
          onSelect={(file: ImageAsset | ImageAsset[]) => {
            const imgs = Array.isArray(file) ? file : [file]
            if (imgs.length > 0) {
              const img = imgs[0]
              setMainImage({
                id: img.id,
                image_asset: img.image,
                alt_text: img.alt_text || img.title || '',
              })
            }
            setIsImageDialogOpen(false)
          }}
          multiple={false}
        />
      </div>

      {/* Gallery Images */}
      <div>
        <label>گالری تصاویر</label>
        <div>
          <button 
            type="button" 
            onClick={() => setIsGalleryDialogOpen(true)} 
            className="btn-secondary"
          >
            انتخاب تصاویر
          </button>
          {gallery.length > 0 && (
            <div className="mt-2 grid grid-cols-7 gap-2">
              {gallery.map((file, idx) => (
                <div key={idx} className="border rounded p-1">
                  <img
                    src={getImageUrl(file)}
                    alt={file.alt_text || `تصویر ${idx + 1}`}
                    className="w-30 h-20 object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <ImageAssetPicker
          isOpen={isGalleryDialogOpen}
          onClose={() => setIsGalleryDialogOpen(false)}
          onSelect={(files: ImageAsset | ImageAsset[]) => {
            const imgs = Array.isArray(files) ? files : [files]
            const mapped = imgs.map(img => ({
              id: img.id,
              image_asset: img.image,
              alt_text: img.alt_text || img.title || '',
            }))
            setGallery(mapped)
            setIsGalleryDialogOpen(false)
          }}
          multiple={true}
        />
      </div>

      {/* Video */}
      <div>
        <label>ویدیوی معرفی</label>
        <div>
          <button 
            type="button" 
            onClick={() => setIsVideoDialogOpen(true)} 
            className="btn-secondary"
          >
            انتخاب ویدیو
          </button>
          {video && (
            <div className="mt-2 w-40 h-28 border rounded overflow-hidden">
              <video
                src={getVideoUrl(video)}
                controls={false}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
              />
            </div>
          )}
        </div>
        <VideoAssetPicker
          isOpen={isVideoDialogOpen}
          onClose={() => setIsVideoDialogOpen(false)}
          onSelect={(file: VideoAsset | VideoAsset[]) => {
            const vids = Array.isArray(file) ? file : [file]
            if (vids.length > 0) {
              const vid = vids[0]
              setVideo({
                id: vid.id,
                video_asset: vid.video,
                title: vid.title || '',
                description: vid.description || '',
              })
            }
            setIsVideoDialogOpen(false)
          }}
        />
      </div>
    </div>
  )
}
