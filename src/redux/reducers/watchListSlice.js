import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchListData: [],
};

const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    setWatchListData: (state, { payload }) => {
      state.watchListData = payload;
    },
    resetWatchlistArr: (state) => {
      state.watchListData = [];
    },
  },
});

export const { setWatchListData, resetWatchlistArr } = watchListSlice.actions;
export const getWatchListStore = (state) => state.watchList;
export default watchListSlice.reducer;
