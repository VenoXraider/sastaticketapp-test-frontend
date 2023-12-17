import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/auth";
import sidebarReducer from "../slices/sidebar";
import excelReducer from "../slices/file";

const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: sidebarReducer,
  excel: excelReducer,
});

export default rootReducer;