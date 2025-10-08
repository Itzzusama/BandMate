import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasConnection: true,
  layout: {},
  onboardingCount: 14,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setHasConnection: (state, action) => {
      state.hasConnection = action.payload;
    },
    saveLayout: (state, action) => {
      state.layout = {
        TOTAL_HEIGHT: action.payload,
        MAX_HEIGHT: action.payload,
        HALF_HEIGHT: (action.payload * 65) / 100,
        MIN_HEIGHT: (action.payload * 11.5) / 100,
        LARGE_HEIGHT: (action.payload * 85) / 100,
        CHECKPOINTS: {
          pointUno: (action.payload * 35) / 100,
          pointDos: (action.payload * 70) / 100,
        },
      };
    },
    setOnboardingCount: (state, action) => {
      state.onboardingCount = action.payload;
    },
  },
});

export const { setHasConnection, saveLayout, setOnboardingCount } =
  navSlice.actions;

export const selectHasConnection = (state) => state.navApp.hasConnection;
export const selectLayout = (state) => state.navApp.layout;
export const count = (state) => state.navApp.onboardingCount;
export default navSlice.reducer;
