import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
}

const token = localStorage.getItem("token");

const initialState: AuthState = {
  isAuthenticated: !!token,
  accessToken: token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;

      console.log("Data Saved", state.isAuthenticated, state.accessToken);
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
