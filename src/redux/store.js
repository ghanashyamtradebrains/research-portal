import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import ThemeSlice from "./reducers/ThemeSlice";
import RecenSearchSlice from "./reducers/RecenSearchSlice";
import AuthToggleSlice from "./reducers/AuthToggleSlice";
import loginTimeSlice from "./reducers/loginTimeSlice";
import watchListSlice from "./reducers/watchListSlice";

export const reducers = combineReducers({
  auth: authSlice,
  theme: ThemeSlice,
  RecentSearch: RecenSearchSlice,
  authToggle: AuthToggleSlice,
  time: loginTimeSlice,
  watchList: watchListSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
