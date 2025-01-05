import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    createUser: (state) => {
      state.value += 1;
    },
    loginUser: (state) => {
      state.value -= 1;
    },
    updateUser: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const { createUser, loginUser, updateUser } = counterSlice.actions;

export default authSlice.reducer;
