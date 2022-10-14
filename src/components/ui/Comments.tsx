import { orderBy } from "lodash";
import React from "react";

import { useComment } from "../../hooks/useComment";

import CommentForm from "../common/comments/CommentForm";
import CommentsList from "../common/comments/CommentsList";

export type CommentState = {
  _id: string;
  userId: string;
  pageId: string;
  content: string;
  created_at: string;
};

const Comments: React.FC = () => {
  const { createComment, comments, deleteComment } = useComment();

  const handleSubmit = (data: { content: string }) => {
    createComment(data);
  };

  const handleDelete = (commentId: string) => {
    deleteComment(commentId);
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
            <CommentsList comments={sortedComments} onDelete={handleDelete} />
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
