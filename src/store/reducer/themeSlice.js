import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: true,
    themeName: "dark",
  },
  reducers: {
    toggleTheme(state, action) {
      state.themeName = action.payload;

      if (action.payload === "system") {
        const systemTheme = Appearance.getColorScheme();
        state.isDarkMode = systemTheme === "dark";
      } else {
        state.isDarkMode = action.payload === "dark";
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;