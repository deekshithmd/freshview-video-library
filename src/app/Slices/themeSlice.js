import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "light-theme",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      state.theme =
        state.theme === "light-theme" ? "dark-theme" : "light-theme";
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;
