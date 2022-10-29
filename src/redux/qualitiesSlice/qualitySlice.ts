import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import qualityService from "../../services/qualityService";
import { RootState } from "../store/store";

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
    qualitiesRequested(state) {
      state.loading = false;
    },

    qualitiesReceived(state, action: PayloadAction<[]>) {
      state.loading = true;
      state.lastFetch = Date.now();
      state.items = action.payload;
    },

    qualitiesRequestedFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

function isOutdate(date: number) {
  if (Date.now() - date > 60 * 10 * 100) return true;
  return false;
}

export const loadQualities = () => async (dispatch: any, getState: any) => {
  const { lastFetch } = getState().qualities;
  if (isOutdate(lastFetch)) {
    dispatch(qualitiesRequested());
    try {
      const { content } = await qualityService.fetchAll();
      dispatch(qualitiesReceived(content));
    } catch (error: any) {
      dispatch(qualitiesRequestedFailed(error.message));
    }
  }
};

export const {
  qualitiesRequested,
  qualitiesReceived,
  qualitiesRequestedFailed,
} = qualitySlice.actions;

export const getQualities = () => (state: RootState) => state.qualities.items;

export const getQualitiesLoading = () => (state: RootState) =>
  state.qualities.loading;

export const getQualitiesByIds =
  (qualitiesIds: string[]) => (state: RootState) => {
    const result = [];
    if (state.qualities.items)
      for (const i of qualitiesIds) {
        for (const j of state.qualities.items) {
          if (i === j._id) {
            result.push(j);
          }
        }
      }
    return result;
  };

export default qualitySlice.reducer;
