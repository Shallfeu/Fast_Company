import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import professionService from "../../services/professionService";

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
});

function isOutdate(date: number) {
  if (Date.now() - date > 60 * 10 * 100) return true;
  return false;
}

export const loadProfessions = () => async (dispatch: any, getState: any) => {
  const { lastFetch } = getState().professions;
  if (isOutdate(lastFetch)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.fetchAll();
      dispatch(professionsReceived(content));
    } catch (error: any) {
      dispatch(professionsRequestedFailed(error.message));
    }
  }
};

export const {
  professionsRequested,
  professionsReceived,
  professionsRequestedFailed,
} = ProfessionSlice.actions;

export const getProfessions = () => (state: RootState) =>
  state.professions.items;

export const getProfessionsLoading = () => (state: RootState) =>
  state.professions.loading;

export const getProfessionById =
  (professionId: string) => (state: RootState) => {
    const { items } = state.professions;
    if (items) {
      return items.find((el) => el._id === professionId);
    }
    return null;
  };

export default ProfessionSlice.reducer;
