import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clients, { thunkHandler } from "../../services/api";
import { toast } from "react-toastify";
import { saveStorage, removeStorage } from "../../services/storage";

const initialState = {
  status: "idle",
  user: null,
};

export const login = createAsyncThunk("auth/login", ({ data }, thunkAPI) => {
  const response = thunkHandler(
    clients.default.client({
      method: "POST",
      url: "/auth/login",
      data,
    }),
    thunkAPI
  );
  return response;
});


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      removeStorage();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload.data;
        state.status = "succeeded";
        state.user = user;
        saveStorage(user);
        toast.success("User Loggedin Successfully");
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload?.data?.message);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;