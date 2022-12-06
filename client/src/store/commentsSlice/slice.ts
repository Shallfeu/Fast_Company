import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IComment {
  _id: string;
  userId: string;
  pageId: string;
  content: string;
  created_at: number;
}

type CommentsState = {
  items: IComment[] | null;
  loading: boolean;
  error: string | null;
};

const initialState: CommentsState = {
  items: null,
  loading: false,
  error: null,
};

const CommentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    CommentsRequested(state) {
      state.loading = true;
    },

    CommentsReceived(state, { payload }: PayloadAction<[]>) {
      state.loading = false;
      state.items = payload;
    },

    CommentsRequestedFailed(state, { payload }: PayloadAction<string>) {
      state.loading = false;
      state.error = payload;
    },

    CommentCreateRequestSuccess(state, { payload }: PayloadAction<IComment>) {
      state.items?.push(payload);
    },

    CommentCreateRequestFailed(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },

    CommentDeleteRequestSuccess(state, { payload }: PayloadAction<string>) {
      if (state.items)
        state.items = state.items.filter((el) => el._id !== payload);
    },

    CommentDeleteRequestFailed(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
  },
});

export const {
  CommentsRequested,
  CommentsReceived,
  CommentsRequestedFailed,
  CommentCreateRequestSuccess,
  CommentCreateRequestFailed,
  CommentDeleteRequestSuccess,
  CommentDeleteRequestFailed,
} = CommentsSlice.actions;

export default CommentsSlice.reducer;
