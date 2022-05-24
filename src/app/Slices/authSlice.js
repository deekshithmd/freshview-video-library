import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  isSignedUp: false,
  loginError: false,
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
      localStorage.clear();
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
        localStorage.setItem("user", JSON.stringify(state.user)),
        toast.success("Login Successful...");
    },
    [loginUser.rejected]: (state, action) => {
      (state.authStatus = "Error"),
        (state.loginError = true),
        toast.error("Something went wrong!!!");
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
