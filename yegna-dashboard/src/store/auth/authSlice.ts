import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  accessToken: string | null;
}

const token = localStorage.getItem("token");

const initialState: AuthState = {
  isAuthenticated: !!token,
  isSuperAdmin: false,
  accessToken: token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ accessToken: string; isSuperAdmin: boolean }>
    ) => {
      state.isAuthenticated = true;
      state.isSuperAdmin = action.payload.isSuperAdmin;
      state.accessToken = action.payload.accessToken;

      console.log("IsAuthenticated", state.isAuthenticated);
      console.log("Is SuperAdmin", state.isSuperAdmin);
    },

    logout: (state) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.isSuperAdmin = false;
      state.accessToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
