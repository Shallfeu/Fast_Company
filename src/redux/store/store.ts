import { configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "../qualitiesSlice/qualitySlice";
import professionReducer from "../professionSlice/professionSlice";

// const rootReducer = combineReducers({ qualitiesReducer });

export const store = configureStore({
  reducer: {
    qualities: qualitiesReducer,
    professions: professionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
