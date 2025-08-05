export interface PaymentGateway {
  id: number
  name: string
  description: string
  is_active: boolean
  api_url: string | null
  api_key: string | null
  api_secret: string | null
  icon: string | null
  created_at: string
  updated_at: string
}
