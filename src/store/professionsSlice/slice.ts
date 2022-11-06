import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ProfessionsState = {
  items: { name: string; _id: string }[] | null;
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
};

const initialState: ProfessionsState = {
  items: null,
  loading: false,
  error: null,
  lastFetch: null,
};

const ProfessionsSlice = createSlice({
  name: "professions",
  initialState,
  reducers: {
    professionsRequested(state) {
      state.loading = true;
    },

    professionsReceived(state, action: PayloadAction<[]>) {
      state.loading = false;
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
} = ProfessionsSlice.actions;

export default ProfessionsSlice.reducer;
