import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/themeSlice";
import authReducer from "./Slices/authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
});
