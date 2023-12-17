import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  json: null,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setExcelFileData: (state, action) => {
      state.json = action.payload.data;
    }
  }
});

export const { setExcelFileData } = fileSlice.actions;
export default fileSlice.reducer;