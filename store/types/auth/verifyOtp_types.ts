export interface VerifyOtpRequest {
  phone_number: string;
  code: string;
}

export interface VerifyOtpResponse {
  access_token: string;
  refresh_token: string;
  user_uuid: string;
}