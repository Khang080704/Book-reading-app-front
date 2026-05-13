import axios from "axios";
import { getAccessToken, clearTokens } from "@/lib/auth";

const baseURL = process.env.NEXT_PUBLIC_API_BASE || "/api/v1";

const apiClient = axios.create({ baseURL });

apiClient.interceptors.request.use((config) => {
  try {

    if (config.url === "/auth/login" || config.url === "/auth/register") {
      return config;
    }

    const token = getAccessToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

apiClient.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error?.response?.status === 401) {
      clearTokens();
    }
    return Promise.reject(error);
  }
);

export default apiClient;

export const get = <T = any>(url: string, params?: any) => apiClient.get<T>(url, { params }).then((r) => r.data);
export const post = <T = any>(url: string, data?: any) => apiClient.post<T>(url, data).then((r) => r.data);
