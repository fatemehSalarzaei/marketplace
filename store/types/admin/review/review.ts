export interface AdminReview {
  id: number
  product: {
    id: number
    title: string
  } | number
  rating: number
  comment: string
  is_approved: boolean
  created_at: string
  updated_at: string
  parent?: number | null
  user: {
    id: number
    first_name: string
    last_name: string
  }
  status?: string
  product_name?: string
  user_name?: string
}
