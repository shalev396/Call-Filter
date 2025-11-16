import axios, { AxiosError } from "axios";

// Smart API URL detection
// Dev: http://localhost:3000 -> API at http://localhost:4000
// Prod: https://yourdomain.com -> API at https://yourdomain.com/api
const getApiUrl = () => {
  if (typeof window === "undefined") {
    // Server-side rendering
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  }

  const origin = window.location.origin;

  // Check if running locally
  if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
    return "http://localhost:4000/api";
  }

  // Production: use same origin with /api prefix
  return `${origin}/api`;
};

const API_URL = getApiUrl();

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (typeof error.config & { _retry?: boolean })
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Don't trigger refresh/logout for initial auth endpoints (login, forgot password, reset password)
    // But DO handle refresh token failures by logging out
    const isInitialAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/forgot-password") ||
      originalRequest.url?.includes("/auth/reset-password");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isInitialAuthEndpoint
    ) {
      originalRequest._retry = true;

      // If this is the refresh endpoint itself failing, logout immediately
      if (originalRequest.url?.includes("/auth/refresh")) {
        console.error("[API] Refresh token failed - logging out");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("idToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // Try to refresh the token for other protected endpoints
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, idToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("idToken", idToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout
        console.error("[API] Token refresh failed - logging out");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("idToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // For initial auth endpoints or other errors, just pass through
    return Promise.reject(error);
  }
);

export default apiClient;

// API Types
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresIn: number;
}

export interface Config {
  whitelist: string[];
  schedule: ScheduleConfig;
}

export interface ScheduleConfig {
  enabled: boolean;
  timezone: string;
  allowedTimes: TimeWindow[];
}

export interface TimeWindow {
  dayOfWeek: number[];
  startTime: string;
  endTime: string;
}

// API Functions
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post<APIResponse<AuthResponse>>("/api/auth/login", {
      email,
      password,
    }),

  refreshToken: (refreshToken: string) =>
    apiClient.post<APIResponse<Partial<AuthResponse>>>("/api/auth/refresh", {
      refreshToken,
    }),

  forgotPassword: (email: string) =>
    apiClient.post<APIResponse>("/api/auth/forgot-password", { email }),

  resetPassword: (email: string, code: string, newPassword: string) =>
    apiClient.post<APIResponse>("/api/auth/reset-password", {
      email,
      code,
      newPassword,
    }),
};

export const configAPI = {
  getConfig: () => apiClient.get<APIResponse<Config>>("/api/config"),

  updateConfig: (config: Config) =>
    apiClient.put<APIResponse>("/api/config", config),
};
