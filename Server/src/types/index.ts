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
  dayOfWeek: number[]; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresIn: number;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
