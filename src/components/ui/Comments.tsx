import { orderBy } from "lodash";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  getCommentsLoading,
  getComments,
} from "../../store/commentsSlice/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import CommentForm from "../common/comments/CommentForm";
import CommentsList from "../common/comments/CommentsList";
import {
  createComment,
  deleteComment,
  loadComments,
} from "../../store/commentsSlice/actions";

interface Param {
  userId: string;
}

const Comments: React.FC = () => {
  const { userId } = useParams<Param>();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(getCommentsLoading());

  const comments = useAppSelector(getComments());

  useEffect(() => {
    dispatch(loadComments(userId));
  }, [userId]);

  const handleSubmit = (data: { content: string }) => {
    dispatch(createComment({ pageId: userId, ...data }));
  };

  const handleDelete = (commentId: string) => {
    dispatch(deleteComment(commentId));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <CommentForm onSubmit={handleSubmit} />
        </div>
      </div>

      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              <span>Comments</span>
            </h5>
            {!loading ? (
              <CommentsList comments={sortedComments} onDelete={handleDelete} />
            ) : (
              <>Loading...</>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
