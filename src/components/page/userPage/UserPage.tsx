import React from "react";

import UserCard from "../../ui/UserCard";
import QualitiesCard from "../../ui/QualitiesCard";
import MeetingsCard from "../../ui/MeetingsCard";
import Comments from "../../ui/Comments";
import { useUsers } from "../../../hooks/useUsers";
import { CommentProvider } from "../../../hooks/useComment";

type UserPageProps = {
  id: string;
};

const UserPage: React.FC<UserPageProps> = ({ id }) => {
  const { getUserById } = useUsers();

  const user = getUserById(id);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard user={user} />
          <QualitiesCard data={user.quality} />
          <MeetingsCard value={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <CommentProvider>
            <Comments />
          </CommentProvider>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
