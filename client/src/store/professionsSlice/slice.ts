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
    ProfessionsRequested(state) {
      state.loading = true;
    },

    ProfessionsReceived(state, action: PayloadAction<[]>) {
      state.loading = false;
      state.lastFetch = Date.now();
      state.items = action.payload;
    },

    ProfessionsRequestedFailed(state, action) {
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
  ProfessionsRequested,
  ProfessionsReceived,
  ProfessionsRequestedFailed,
} = ProfessionsSlice.actions;

export default ProfessionsSlice.reducer;
