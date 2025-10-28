import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  refreshToken: "",
  isOnBoarding: false,
};
export const authConfigsSlice = createSlice({
  name: "authConfigs",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    setOnBoarding(state, action) {
      state.isOnBoarding = action.payload;
    },
    logout(state) {
      state.token = "";
      state.refreshToken = "";
    },
  },
});

export const { setToken, setRefreshToken, setOnBoarding, logout } =
  authConfigsSlice.actions;
