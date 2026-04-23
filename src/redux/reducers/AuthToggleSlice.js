import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleForm: null,
  redirect: null,
  googleSignIn: null,
};

const AuthToggleSlice = createSlice({
  name: "authToggle",
  initialState,
  reducers: {
    setToggleForm: (state, { payload }) => {
      state.toggleForm = payload;
    },
    setRedirectUrl: (state, { payload }) => {
      state.redirect = payload;
    },
    setGoogleSignIn: (state, { payload }) => {
      state.googleSignIn = payload;
    },
  },
});

export const { setToggleForm, setRedirectUrl, setGoogleSignIn } =
  AuthToggleSlice.actions;
export const toggleStore = (state) => state.authToggle;
export default AuthToggleSlice.reducer;
