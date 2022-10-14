import React from "react";

import { StateData } from "../page/usersListPage/UsersListPage";
import BookMark from "../common/BookMark";
import Table from "../common/table";
import Profession from "./Profession";
import QualitiesList from "./qualities/QualitiesList";

export type UsersTableProps = {
  users: StateData[];
  currentSort: { path: string; order: "asc" | "desc" };
  onToggleMark: (userId: string) => void;
  onSort: (item: { path: string; order: "asc" | "desc" }) => void;
};

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  currentSort,
  onToggleMark,
  onSort,
}) => {
  const columns = {
    name: { path: "name", name: "Имя" },

    qualities: {
      path: "qualities",
      name: "Качества",
      component: (user: StateData) => (
        <QualitiesList qualities={user.quality} />
      ),
    },

    profession: {
      path: "profession",
      name: "Профессия",
      component: (user: StateData) => <Profession id={user.profession} />,
    },

    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },

    rate: { path: "rate", name: "Оценка" },

    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user: StateData) => (
        <BookMark
          _id={user?._id}
          status={user?.bookmark}
          onToggleMark={() => onToggleMark(user?._id)}
        />
      ),
    },
  };

  return (
    <Table
      selectedSort={currentSort}
      columns={columns}
      onSort={onSort}
      data={users}
    />
  );
};

export default UsersTable;
