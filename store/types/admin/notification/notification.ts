export interface Notification {
  id: number
  user: string
  title: string
  message: string
  type: string
  channel: string
  is_read: boolean
  link?: string
  expires_at?: string
  created_at: string
  scheduled_at?: string
}

export interface PaginatedNotificationResponse {
  count: number
  next: string | null
  previous: string | null
  results: Notification[]
}

