export interface Actor {
  id: number
  first_name: string
  last_name: string
  email: string
  phone_number: string
}

export interface LogEntry {
  id: number
  actor: Actor
  action: number
  action_display: string
  timestamp: string
  object_repr: string
  changes: Record<string, [string, string]>
  content_type: string
  object_id: number
  remote_addr: string
}

export interface LogEntryResponse {
  count: number
  next: string | null
  previous: string | null
  results: LogEntry[]
}
