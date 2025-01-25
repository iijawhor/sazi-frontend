import { configureStore } from "@reduxjs/toolkit";
import assignmentReducer from "./slices/assignmentSlice";
import headerReducer from "./slices/updateHeaderSlice";
import userReducer from "./slices/authSlice";
export const store = configureStore({
  reducer: {
    assignment: assignmentReducer,
    header: headerReducer,
    user: userReducer
  }
});
