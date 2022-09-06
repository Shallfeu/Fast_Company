import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { StateData } from "../usersListPage/UsersListPage";
import QualitiesList from "../../ui/qualities/QualitiesList";

import api from "../../../api";
import EditPage from "../editPage";

type UserPageProps = {
  id: string;
};

type ParamsHook = {
  edit: string;
};

const UserPage: React.FC<UserPageProps> = ({ id }) => {
  const [user, setUser] = useState<StateData>();

  const { edit } = useParams<ParamsHook>();

  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data));
  }, [user]);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {edit ? (
        <EditPage userInfo={user} />
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column flex-shrink-o p-3 align-items-center">
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <h5>Пол: {user.sex === "male" ? "мужской" : "женский"}</h5>
            <QualitiesList qualities={user.qualities} />
            <h3>Встретился, раз: {user.completedMeetings}</h3>
            <h4>Оценка: {user.rate}</h4>
          </div>

          <Link to={`/users/${user._id}/edit`}>
            <button type="button">Редактировать</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default UserPage;
