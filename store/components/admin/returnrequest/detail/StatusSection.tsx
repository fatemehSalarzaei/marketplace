import React from 'react'
import { Badge } from '@/components/ui/Badge'
import { ReturnRequestDetail } from '@/types/admin/returnRequests/details/returnRequests'

const statusMap: Record<string, string> = {
  pending: 'در انتظار بررسی',
  approved: 'تأیید شده',
  rejected: 'رد شده',
  refunded: 'مبلغ بازگشت داده شد',
}

export default function StatusSection({ data }: { data: ReturnRequestDetail }) {
  return (
    <div className="space-y-1">
      <p>
        <strong>وضعیت:</strong>{' '}
        <Badge>{statusMap[data.status] || data.status}</Badge>
      </p>
      <p><strong>دلیل:</strong> {data.reason}</p>
      <p><strong>تاریخ درخواست:</strong> {data.requested_at}</p>
      {data.processed_at && (
        <p><strong>تاریخ رسیدگی:</strong> {data.processed_at}</p>
      )}
    </div>
  )
}
