import React from "react";

import { StateData } from "../page/usersListPage/UsersListPage";
import BookMark from "../common/BookMark";
import Qualities from "./qualities";
import Table from "../common/table";
import Profession from "./Profession";

export type UsersTableProps = {
  users: StateData[];
  currentSort: { path: string; order: "asc" | "desc" };
  onDelete: (userId: string) => void;
  onToggleMark: (userId: string) => void;
  onSort: (item: { path: string; order: "asc" | "desc" }) => void;
};

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  currentSort,
  onDelete,
  onToggleMark,
  onSort,
}) => {
  const columns = {
    name: { path: "name", name: "Имя" },

    qualities: {
      path: "qualities",
      name: "Качества",
      component: (user: StateData) => <Qualities qualities={user.quality} />,
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

    delete: {
      component: (user: StateData) => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(user?._id)}
        >
          delete
        </button>
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
