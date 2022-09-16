import React from "react";

import Comment from "./Comment";

export type CommentsData = {
  _id: string;
  userId: string;
  pageId: string;
  content: string;
  created_at: string;
};

type CommentsListProps = {
  comments: CommentsData[];
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
          time={comment["created_at" as keyof typeof comment]}
          content={comment.content}
        />
      ))}
    </>
  );
};

export default CommentsList;
