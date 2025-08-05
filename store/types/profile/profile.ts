// برای دریافت پروفایل
export interface UserProfileResponse {
  first_name: string | null
  last_name: string | null
  email: string | null
  national_code: string | null
  phone_number: string | null
  avatar: string | null
  birth_date: string | null
}

// برای ویرایش پروفایل
export interface UserProfileUpdateRequest {
  first_name: string | null
  last_name: string | null
  email: string | null
  national_code: string | null
  birth_date: string | null
}
