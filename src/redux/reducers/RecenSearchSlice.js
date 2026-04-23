import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    values:[]
}

const RecentSearchSlice = createSlice({
  name: "RecentSearch",
  initialState,
  reducers: {
    AddStock: (state, { payload }) => {
      const symbols=state.values?.map((data)=>data.symbol)
      if(symbols.includes(payload.symbol) || payload.fincode === null){
        return state
      }
      else{
        return {...state,values:[payload,...state.values.slice(0,3)]}
      }
      
    },
  },
});

export const {AddStock} = RecentSearchSlice.actions;
 export const getRecentSearch = (state) => state.RecentSearch;
export default RecentSearchSlice.reducer;
