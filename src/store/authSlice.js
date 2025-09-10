import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("authUser");
const savedToken = localStorage.getItem("authToken");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  isAuthenticated: !!(savedUser && savedToken),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;

      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
      localStorage.setItem("authToken", action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;

export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      credentials.email === "admin@example.com" &&
      credentials.password === "password"
    ) {
      const user = {
        id: 1,
        email: credentials.email,
        name: "Admin User",
      };

      const token = `fake-jwt-token-${Date.now()}`;

      dispatch(loginSuccess({ user, token }));
    } else {
      dispatch(loginFailure("Data invalid. Please check your credentials."));
    }
  } catch (error) {
    dispatch(loginFailure("Login failed. Please try again."));
  }
};

export default authSlice.reducer;
