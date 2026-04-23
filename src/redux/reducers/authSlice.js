import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.userData = payload;
    },
    updateAccessToken: (state, { payload }) => {
      if (state.userData) {
        state.userData.access_token = payload;
      }
    },
  },
});

export const { setAuth, updateAccessToken } = authSlice.actions;
export const authStore = (state) => state.auth;
export default authSlice.reducer;
