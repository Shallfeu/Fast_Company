import React from "react";
import { Link } from "react-router-dom";

import { getProfessions } from "../../store/professionsSlice/selectors";
import { useAppSelector } from "../../store/hooks";
import { IUser } from "../../store/usersSlice/slice";
import { getCurrentUserData } from "../../store/usersSlice/selectors";

type UserCardProps = {
  user: IUser;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const currentUser = useAppSelector(getCurrentUserData);
  const professions = useAppSelector(getProfessions());
  if (!professions) return <>Loading...</>;

  return (
    <div className="card mb-3">
      <div className="card-body">
        {currentUser && currentUser._id === user._id && (
          <Link to={`/users/${currentUser._id}/edit`}>
            <button
              type="button"
              className="position-absolute top-0 end-0 btn btn-light btn-sm"
            >
              <i className="bi bi-gear"></i>
            </button>
          </Link>
        )}

        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={user.image}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="150"
            height="150"
          />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">
              Профессия:{" "}
              {professions.find((prof) => prof._id === user.profession)?.name}
            </p>
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
