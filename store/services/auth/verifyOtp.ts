import axios from "axios";
import { API_ENDPOINTS } from "@/lib/config";

export const verifyCode = (phone_number: string, code: string) => {
  return axios.post(API_ENDPOINTS.verifyOtp, { phone_number, code });
};
