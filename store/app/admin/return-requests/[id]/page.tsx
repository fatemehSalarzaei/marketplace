'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getReturnRequestById } from '@/services/admin/returnRequests/returnRequests'
import ReturnRequestStatusEditor from '@/components/admin/returnrequest/detail/ReturnRequestStatusEditor'
import ReturnRequestDetailView from '@/components/admin/returnrequest/detail/ReturnRequestDetail'
import { ReturnRequestDetail } from '@/types/admin/returnRequests/details/returnRequests'
import { Button } from '@/components/ui/button' // مسیر با حروف کوچک مطمئن شو

export default function AdminReturnRequestPage() {
  const { id } = useParams()
  const [data, setData] = useState<ReturnRequestDetail | null>(null)
  const [statusEditorOpen, setStatusEditorOpen] = useState(false)

  const loadData = async () => {
    const fetched = await getReturnRequestById(Number(id))
    setData(fetched)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="p-4 space-y-4">
      {data && (
        <div className="flex justify-end mb-2">
          <Button onClick={() => setStatusEditorOpen(true)}>ویرایش وضعیت</Button>
        </div>
      )}

      {data && <ReturnRequestDetailView data={data} />}

      {data && (
        <ReturnRequestStatusEditor
          open={statusEditorOpen}
          onClose={() => setStatusEditorOpen(false)}
          requestId={data.id}
          currentStatus={data.status}
          onUpdated={loadData}
        />
      )}
    </div>
  )
}
