import React, { useState, useEffect } from "react";
import API from "../../../api";

import { StateData } from "../usersListPage/UsersListPage";

import UserCard from "../../ui/UserCard";
import QualitiesCard from "../../ui/QualitiesCard";
import MeetingsCard from "../../ui/MeetingsCard";
import Comments from "../../ui/Comments";

type UserPageProps = {
  id: string;
};

const UserPage: React.FC<UserPageProps> = ({ id }) => {
  const [user, setUser] = useState<StateData>();

  useEffect(() => {
    API.users.getById(id).then((data) => setUser(data));
  }, [user, id]);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard user={user} />
          <QualitiesCard data={user.qualities} />
          <MeetingsCard value={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
