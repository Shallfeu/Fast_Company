import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { StateData } from "./layouts/Users";
import QualitiesList from "./QualitiesList";

import api from "../api";

type HookProps = {
  userId: string;
};

const UserProfile: React.FC = () => {
  const { userId } = useParams<HookProps>();
  const [user, setUser] = useState<StateData>();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="d-flex flex-column flex-shrink-o p-3 align-items-center">
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <h3>Встретился, раз: {user.completedMeetings}</h3>
        <h4>Оценка: {user.rate}</h4>
      </div>

      <Link to="/users">
        {" "}
        <button type="button">Все пользователи</button>
      </Link>
    </div>
  );
};

export default UserProfile;
