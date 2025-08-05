import React from 'react'

interface Props {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  message: string
}

export default function ConfirmDialog({ open, onConfirm, onCancel, message }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-right">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-x-4">
          <button onClick={onCancel} className="px-4 py-1 pl-5 border rounded">
            لغو
          </button>
          <button onClick={onConfirm} className="px-4 py-1 bg-red-600 text-white rounded">
            تایید
          </button>
        </div>
      </div>
    </div>
  )
}
