import { useState } from 'react'

export const useAssetPicker = () => {
  const [videoPickerOpen, setVideoPickerOpen] = useState(false)
  const [imagePickerOpen, setImagePickerOpen] = useState(false)

  const openVideoPicker = () => setVideoPickerOpen(true)
  const closeVideoPicker = () => setVideoPickerOpen(false)

  const openImagePicker = () => setImagePickerOpen(true)
  const closeImagePicker = () => setImagePickerOpen(false)

  return {
    videoPickerOpen,
    imagePickerOpen,
    openVideoPicker,
    closeVideoPicker,
    openImagePicker,
    closeImagePicker,
  }
}
