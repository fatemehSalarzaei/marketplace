// services/authService.ts
import axios from 'axios';
import { API_BASE_URL } from "@/lib/config";

const AUTH_API = `${API_BASE_URL}/accounts/auth`;

export const sendLoginCode = async (phone_number: string) => {
  const response = await axios.post(`${AUTH_API}/send-code/`, {
    phone_number,
  });
  return response.data;
};
