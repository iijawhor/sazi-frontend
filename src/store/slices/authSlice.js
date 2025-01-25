import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
  logout: ""
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state) => {},
    loginUser: (state) => {},
    updateUser: (state, action) => {},
    userDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    userLogout: (state, action) => {}
  }
});

export const { createUser, loginUser, updateUser, userDetails } =
  authSlice.actions;

export default authSlice.reducer;
