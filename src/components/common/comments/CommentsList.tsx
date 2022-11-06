import React from "react";
import { IComment } from "../../../store/commentsSlice/slice";

import Comment from "./Comment";

type CommentsListProps = {
  comments: IComment[];
  onDelete: (id: string) => void;
};

const CommentsList: React.FC<CommentsListProps> = ({ comments, onDelete }) => {
  return (
    <>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          id={comment._id}
          onDelete={onDelete}
          userId={comment.userId}
          time={comment.created_at}
          content={comment.content}
        />
      ))}
    </>
  );
};

export default CommentsList;
