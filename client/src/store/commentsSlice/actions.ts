import { createAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentsService from "../../services/commentService";
import {
  CommentsRequested,
  CommentsReceived,
  CommentsRequestedFailed,
  CommentCreateRequestFailed,
  CommentCreateRequestSuccess,
  CommentDeleteRequestFailed,
  CommentDeleteRequestSuccess,
} from "./slice";

const CommentCreateRequest = createAction("comments/CommentCreateRequest");
const CommentDeleteRequest = createAction("comments/CommentDeleteRequest");

export const loadComments = (pageId: string) => async (dispatch: any) => {
  try {
    dispatch(CommentsRequested());
    const { content } = await commentsService.fetchAll(pageId);
    dispatch(CommentsReceived(content));
  } catch (error: any) {
    dispatch(CommentsRequestedFailed(error.message));
  }
};

export const createComment =
  (data: any) => async (dispatch: any, getState: any) => {
    const state = getState();
    try {
      dispatch(CommentCreateRequest());
      const { content } = await commentsService.create({
        content: data.content,
        _id: nanoid(),
        userId: state.users.auth.userId,
        pageId: data.pageId,
        created_at: Date.now(),
      });
      dispatch(CommentCreateRequestSuccess(content));
    } catch (error: any) {
      dispatch(dispatch(CommentCreateRequestFailed(error.message)));
    }
  };

export const deleteComment = (id: any) => async (dispatch: any) => {
  try {
    dispatch(CommentDeleteRequest());
    const { content } = await commentsService.remove(id);
    dispatch(CommentDeleteRequestSuccess(id));
    return content;
  } catch (error: any) {
    dispatch(CommentDeleteRequestFailed(error.message));
  }
};
