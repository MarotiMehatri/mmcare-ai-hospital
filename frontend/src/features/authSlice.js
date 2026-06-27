
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "./authService";

const initialState = {
  user: null,
  role: null,
  error: null,
};

export const signup = createAsyncThunk("auth/signup", async (userData) => {
  return await registerUser(userData);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
