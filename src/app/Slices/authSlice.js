import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isSignedUp: false,
  isLoggedIn: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ data }, thunkAPI) => {
    try {
      const response = await axios.post("api/auth/signup", {
        ...data,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("login");
      localStorage.removeItem("watchlater");
      localStorage.removeItem("liked");
      localStorage.removeItem("history");
      localStorage.removeItem("playlist");
      return {
        token: null,
        user: null,
      };
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.authStatus = "pending";
    },
    [loginUser.fulfilled]: (state, action) => {
      (state.authStatus = "fulfilled"),
        (state.isLoggedIn = true),
        (state.token = action.payload.encodedToken),
        (state.user = action.payload.foundUser),
        localStorage.setItem("token", state.token),
        localStorage.setItem("user", JSON.stringify(state.user));
    },
    [loginUser.rejected]: (state, action) => {
      (state.authStatus = "Error"), (state.error = action.payload);
    },
    [signupUser.pending]: (state) => {
      state.authStatus = "pending";
    },
    [signupUser.fulfilled]: (state) => {
      (state.authStatus = "fulfilled"), (state.isSignedUp = true);
    },
    [signupUser.rejected]: (state) => {
      state.authStatus = "rejected";
    },
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
