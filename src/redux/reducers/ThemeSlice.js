import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lightMode: false,
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleThemeMode: (state, { payload }) => {
      return  {...state,lightMode:payload}
    },
  },
});

export const {toggleThemeMode} = ThemeSlice.actions;
export const getThemeMode=(state)=>state.theme
export default ThemeSlice.reducer;
