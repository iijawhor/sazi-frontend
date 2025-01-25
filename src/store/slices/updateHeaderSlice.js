import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "home"
};
export const updateHeaderSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    updateHeader: (state, action) => {
      state.title = action.payload;
    }
  }
});

export const { updateHeader } = updateHeaderSlice.actions;
export default updateHeaderSlice.reducer;
