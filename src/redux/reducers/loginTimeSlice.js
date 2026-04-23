import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginTime: null,
  sessionTime: null,
};

const loginTimeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setLoginTime: (state, action) => {
      state.loginTime = action.payload;
    },
    setSessionTime: (state, action) => {
      state.sessionTime = action.payload;
    },
  },
});

export const { setLoginTime, setSessionTime } = loginTimeSlice.actions;
export const timeStore = (state) => state.time;
export default loginTimeSlice.reducer;
