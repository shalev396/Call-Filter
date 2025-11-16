import apiClient, { Config } from "@/lib/api";

// Auth Services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post("/auth/refresh", { refreshToken });
    return response.data.data;
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (email: string, code: string, newPassword: string) => {
    const response = await apiClient.post("/auth/reset-password", {
      email,
      code,
      newPassword,
    });
    return response.data;
  },
};

// Config Services
export const configService = {
  getConfig: async (): Promise<Config> => {
    const response = await apiClient.get("/config");
    return response.data.data;
  },

  updateConfig: async (config: Config): Promise<Config> => {
    const response = await apiClient.put("/config", config);
    return response.data.data || config;
  },
};
