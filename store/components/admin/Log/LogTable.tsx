"use client";

import React from 'react'
import { LogEntry } from '@/types/admin/logs/logs'

interface Props {
  logs: LogEntry[]
}

const LogTable: React.FC<Props> = ({ logs }) => {
  return (
    <table className="min-w-full table-auto border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-2 py-1">شناسه</th>
          <th className="border px-2 py-1">کاربر</th>
          <th className="border px-2 py-1">عملیات</th>
          <th className="border px-2 py-1">شیء</th>
          <th className="border px-2 py-1">تغییرات</th>
          <th className="border px-2 py-1">تاریخ و زمان</th>
        </tr>
      </thead>
      <tbody>
        {logs.map(log => (
          <tr key={log.id}>
            <td className="border px-2 py-1">{log.id}</td>
            <td className="border px-2 py-1">
              {log.actor.first_name} {log.actor.last_name} ({log.actor.phone_number})
            </td>
            <td className="border px-2 py-1">{log.action_display}</td>
            <td className="border px-2 py-1">{log.object_repr}</td>
            <td className="border px-2 py-1">
              {Object.entries(log.changes).map(([field, [oldVal, newVal]]) => (
                <div key={field}>
                  <strong>{field}</strong>: {oldVal} → {newVal}
                </div>
              ))}
            </td>
            <td className="border px-2 py-1">{new Date(log.timestamp).toLocaleString('fa-IR')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default LogTable
