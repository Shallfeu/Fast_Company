import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import EditPage from "../components/page/editPage";

type HookProps = {
  userId: string;
  edit: string;
};

const Users: React.FC = () => {
  const { userId, edit } = useParams<HookProps>();
  return (
    <>
      {userId ? (
        edit ? (
          <EditPage />
        ) : (
          <UserPage id={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  );
};

export default Users;
