import React from "react";
import { useParams } from "react-router-dom";

import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import EditPage from "../components/page/editPage";
import UsersLoader from "../components/ui/hoc/UsersLoader";

type HookProps = {
  userId: string;
  edit: string;
};

const Users: React.FC = () => {
  const { userId, edit } = useParams<HookProps>();

  return (
    <UsersLoader>
      {userId ? (
        edit ? (
          <EditPage />
        ) : (
          <UserPage id={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </UsersLoader>
  );
};

export default Users;
