import React from "react";

import BookMark from "../common/BookMark";
import Table from "../common/table";
import Profession from "./Profession";
import QualitiesList from "./qualities/QualitiesList";
import { IUser } from "../../store/usersSlice/slice";

export type UsersTableProps = {
  users: IUser[];
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
      component: (user: IUser) => <QualitiesList qualities={user.qualities} />,
    },

    profession: {
      path: "profession",
      name: "Профессия",
      component: (user: IUser) => <Profession id={user.profession} />,
    },

    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },

    rate: { path: "rate", name: "Оценка" },

    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user: IUser) => (
        <BookMark
          _id={user?._id}
          status={user.bookmark ? user?.bookmark : null}
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
