import React from "react";
import { Link } from "react-router-dom";

import { StateData } from "../page/usersListPage/UsersListPage";

type UserCardProps = {
  user: StateData;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link to={`/users/${user._id}/edit`}>
          <button
            type="button"
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
          >
            <i className="bi bi-gear"></i>
          </button>
        </Link>

        <div className="d-flex flex-column align-items-center text-center position-relative">
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
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">Профессия: {user.profession}</p>
            <p
              className={`text-${
                user.sex === "male" ? "primary" : "danger"
              } mb-1`}
            >
              {user.sex === "male" ? "мужской" : "женский"}
            </p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
