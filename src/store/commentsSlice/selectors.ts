import { RootState } from "../store";

export const getComments = () => (state: RootState) => state.comments.items;

export const getCommentsLoading = () => (state: RootState) =>
  state.comments.loading;

export const getCommentById = (commentId: string) => (state: RootState) => {
  const { items } = state.comments;
  if (items) {
    return items.find((el) => el._id === commentId);
  }
  return null;
};
