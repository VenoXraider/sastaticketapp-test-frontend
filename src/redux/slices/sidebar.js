import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  expanded: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    expandSideBar: (state) => {
      state.expanded = true;
    },
    collapseSideBar: (state) => {
      state.expanded = false;
    },
  }
});

export const { expandSideBar, collapseSideBar } = sidebarSlice.actions;
export default sidebarSlice.reducer;