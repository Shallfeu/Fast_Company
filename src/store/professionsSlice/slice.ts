import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ProfessionState = {
  items: { name: string; _id: string }[] | null;
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
};

const initialState: ProfessionState = {
  items: null,
  loading: false,
  error: null,
  lastFetch: null,
};

const ProfessionSlice = createSlice({
  name: "professions",
  initialState,
  reducers: {
    professionsRequested(state) {
      state.loading = false;
    },

    professionsReceived(state, action: PayloadAction<[]>) {
      state.loading = true;
      state.lastFetch = Date.now();
      state.items = action.payload;
    },

    professionsRequestedFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  // extraReducers: {
  //   [fetchUsersAsync.pending.type]: (state) => {
  //     state.loading = true;
  //   },

  //   [fetchUsersAsync.fulfilled.type]: (state, { payload }) => {
  //     state.loading = false;
  //     state.usersData = payload;
  //   },

  //   [fetchUsersAsync.rejected.type]: (state, { payload }) => {
  //     state.loading = false;
  //     state.error = payload;
  //   },
  // },
});

export const {
  professionsRequested,
  professionsReceived,
  professionsRequestedFailed,
} = ProfessionSlice.actions;

export default ProfessionSlice.reducer;
