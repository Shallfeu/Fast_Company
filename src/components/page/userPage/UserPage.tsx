import React from "react";

import UserCard from "../../ui/UserCard";
import QualitiesCard from "../../ui/QualitiesCard";
import MeetingsCard from "../../ui/MeetingsCard";
import Comments from "../../ui/Comments";
import { useAppSelector } from "../../../store/hooks";
import { getUserById } from "../../../store/usersSlice/selectors";

type UserPageProps = {
  id: string;
};

const UserPage: React.FC<UserPageProps> = ({ id }) => {
  const user = useAppSelector(getUserById(id));

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
