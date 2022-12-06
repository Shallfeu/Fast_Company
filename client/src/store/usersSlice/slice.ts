import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import localStorageService from "../../services/localStorageService";

export type IUser = {
  _id: string;
  completedMeetings: number;
  email: string;
  image: string;
  licence: boolean;
  name: string;
  qualities: string[];
  password: string;
  profession: string;
  rate: number;
  sex: string;
  bookmark?: boolean;
};

type UserState = {
  items: IUser[] | null;
  loading: boolean;
  error: string | null;
  auth: { userId: string | null } | null;
  logged: boolean;
  created: boolean;
  dataLoaded: boolean;
};

const initialState: UserState = {
  items: null,
  loading: false,
  error: null,
  auth: localStorageService.getAccessToken()
    ? { userId: localStorageService.getUserId() }
    : null,
  logged: true,
  created: true,
  dataLoaded: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    UsersRequested(state) {
      state.loading = true;
    },

    UsersReceived(state, { payload }: PayloadAction<IUser[]>) {
      state.loading = false;
      state.dataLoaded = true;
      state.error = null;
      state.items = payload;
    },

    UsersRequestedFailed(state, { payload }: PayloadAction<string>) {
      state.loading = false;
      state.error = payload;
    },

    AuthRequestSuccess(state, { payload }: PayloadAction<{ userId: string }>) {
      state.logged = true;
      state.auth = { ...payload };
    },

    AuthRequestFailed(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },

    CreateUserRequestSuccess(state, { payload }: PayloadAction<IUser>) {
      state.created = true;
      state.items?.push(payload);
    },

    UserLogOut(state) {
      state.items = null;
      state.auth = null;
      state.logged = false;
      state.dataLoaded = false;
    },

    UpdateUsers(state, { payload }: PayloadAction<IUser>) {
      if (state.items) {
        const updatedIndex = state.items.findIndex(
          (el) => el._id === payload._id
        );
        state.items[updatedIndex] = { ...payload };
      }
    },
  },
});

export const {
  UsersRequested,
  UsersReceived,
  UsersRequestedFailed,
  AuthRequestSuccess,
  AuthRequestFailed,
  CreateUserRequestSuccess,
  UserLogOut,
  UpdateUsers,
} = userSlice.actions;

export default userSlice.reducer;
