import React, { useEffect, useState } from "react";

import API from "../../../api";
import { date } from "../../../utils/date";

import { StateData } from "../../page/usersListPage/UsersListPage";

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
  const [user, setUser] = useState<StateData>();
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, [userId]);

  if (!user) return <h4>Loading...</h4>;

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
              )
                .toString(36)
                .substring(7)}.svg`}
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
                  <button
                    type="button"
                    className="btn btn-sm text-primary d-flex align-items-center"
                    onClick={() => onDelete(id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
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
