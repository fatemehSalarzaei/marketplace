import React from 'react'
import { ReturnRequestDetail } from '@/types/admin/returnRequests/details/returnRequests'

export default function UserSection({ user }: { user: ReturnRequestDetail['user'] }) {
  return (
    <div className="space-y-1">
      <h3 className="font-semibold">اطلاعات کاربر</h3>
      <p>{user.first_name} {user.last_name}</p>
      <p>{user.phone_number}</p>
    </div>
  )
}
