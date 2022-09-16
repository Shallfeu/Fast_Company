import { orderBy } from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../../api";

import CommentForm from "../common/comments/CommentForm";
import CommentsList from "../common/comments/CommentsList";

export type CommentState = {
  _id: string;
  userId: string;
  pageId: string;
  content: string;
  created_at: string;
};

type HookProps = {
  userId: string;
};

const Comments: React.FC = () => {
  const { userId } = useParams<HookProps>();

  const [comments, setComments] = useState<CommentState[]>([]);

  useEffect(() => {
    API.comments.fetchAll().then((data) => setComments(data));
  }, []);

  const handleSubmit = (data: { userId: string; content: string }) => {
    API.comments
      .add({
        ...data,
        pageId: userId,
      })
      .then((data) => {
        setComments([...comments, data]);
      });
  };

  const handleDelete = (commentId: string) => {
    API.comments.remove(commentId).then((id) => {
      setComments(comments.filter((comment) => comment._id === id));
    });
  };

  // const handleSortByDate = (items: CommentState[]) => {
  //   return items.sort(
  //     (a, b) =>
  //       Number(a["created_at" as keyof typeof a]) -
  //       Number(b["created_at" as keyof typeof b])
  //   );
  // };

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
