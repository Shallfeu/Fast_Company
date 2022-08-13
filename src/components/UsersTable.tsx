import React from "react";

import { StateData } from "./layouts/Users";
import BookMark from "./BookMark";
import QualitiesList from "./QualitiesList";
import Table from "./Table";

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
      component: (user: StateData) => (
        <QualitiesList qualities={user.qualities} />
      ),
    },
    profession: { path: "profession.name", name: "Профессия" },
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
