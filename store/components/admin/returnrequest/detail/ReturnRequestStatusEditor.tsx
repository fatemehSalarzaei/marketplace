'use client'

import React, { useState } from 'react'
import { updateReturnRequestStatus } from '@/services/admin/returnRequests/returnRequests'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

interface Props {
  open: boolean
  onClose: () => void
  requestId: number
  currentStatus: string
  onUpdated: () => void
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'در انتظار بررسی' },
  { value: 'approved', label: 'تأیید شده' },
  { value: 'rejected', label: 'رد شده' }
]

export default function ReturnRequestStatusEditor({ open, onClose, requestId, currentStatus, onUpdated }: Props) {
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    setLoading(true)
    await updateReturnRequestStatus(requestId, status)
    setLoading(false)
    onUpdated()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>ویرایش وضعیت</DialogTitle>
        <div className="space-y-4">
          <select
            className="w-full border rounded p-2"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="" disabled>انتخاب وضعیت</option>
            {STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <Button onClick={handleUpdate} disabled={loading}>
            ذخیره تغییرات
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
