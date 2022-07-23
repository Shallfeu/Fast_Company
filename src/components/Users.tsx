import React from "react";
import User from "./User";
import { StateData } from "../App";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";

export type UsersProps = {
  users: StateData[];
  onDelete: (userId: string) => void;
  onToggleMark: (userId: string) => void;
};

const Users: React.FC<UsersProps> = ({ users, onDelete, onToggleMark }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(users, currentPage, pageSize);

  return (
    <>
      {count !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              <User
                key={user._id}
                onDelete={onDelete}
                onToggleMark={onToggleMark}
                user={user}
              />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default Users;
