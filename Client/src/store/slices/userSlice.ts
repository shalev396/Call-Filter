import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authService } from "@/services/api";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresIn: number;
}

interface UserState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  idToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  idToken: null,
  loading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    const data = await authService.login(email, password);
    return data as AuthResponse;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("idToken");
});

export const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const idToken = localStorage.getItem("idToken");

  if (!accessToken || !refreshToken || !idToken) {
    throw new Error("No auth tokens found");
  }

  return { accessToken, refreshToken, idToken };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          state.idToken = action.payload.idToken;

          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
          localStorage.setItem("idToken", action.payload.idToken);
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.idToken = null;
      })

      // Check Auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.idToken = action.payload.idToken;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.idToken = null;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
