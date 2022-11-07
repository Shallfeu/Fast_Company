import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type QualitiesState = {
  items: { name: string; _id: string; color: string }[] | null;
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
};

const initialState: QualitiesState = {
  items: null,
  loading: false,
  error: null,
  lastFetch: null,
};

const qualitySlice = createSlice({
  name: "qualities",
  initialState,
  reducers: {
    QualitiesRequested(state) {
      state.loading = true;
    },

    QualitiesReceived(state, action: PayloadAction<[]>) {
      state.loading = false;
      state.lastFetch = Date.now();
      state.items = action.payload;
    },

    QualitiesRequestedFailed(state, action) {
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
  QualitiesRequested,
  QualitiesReceived,
  QualitiesRequestedFailed,
} = qualitySlice.actions;

export default qualitySlice.reducer;
