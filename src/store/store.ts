import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualitiesSlice/slice";
import professionReducer from "./professionsSlice/slice";
import userReducer from "./usersSlice/slice";

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionReducer,
  users: userReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
