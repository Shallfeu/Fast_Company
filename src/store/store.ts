import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualitiesSlice/slice";
import professionsReducer from "./professionsSlice/slice";
import usersReducer from "./usersSlice/slice";
import commentsReducer from "./commentsSlice/slice";

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionsReducer,
  users: usersReducer,
  comments: commentsReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
