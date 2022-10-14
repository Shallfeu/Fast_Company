import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useUsers } from "../../../hooks/useUsers";

import { date } from "../../../utils/date";

type CommentProps = {
  userId: string;
  id: string;
  time: string;
  content: string;
  onDelete: (commentId: string) => void;
};

const Comment: React.FC<CommentProps> = ({
  userId,
  id,
  time,
  content,
  onDelete,
}) => {
  const { getUserById } = useUsers();
  const { currentUser } = useAuth();
  const user = getUserById(userId);

  if (!user || !currentUser) return <>Loading...</>;

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              src={user.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="150"
              height="150"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {user.name}
                    <span className="small"> - {date(time)}</span>
                  </p>
                  {currentUser._id === userId && (
                    <button
                      type="button"
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onDelete(id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
