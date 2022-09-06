import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";

type HookProps = {
  userId: string;
};

const Users: React.FC = () => {
  const { userId } = useParams<HookProps>();
  return <>{userId ? <UserPage id={userId} /> : <UsersListPage />}</>;
};

export default Users;
