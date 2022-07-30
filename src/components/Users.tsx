import React from "react";
import { StateData } from "../App";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";
import User from "./User";
import FilterList from "./FilterLIst";
import api from "../api";

export type UsersProps = {
  users: StateData[];
  onDelete: (userId: string) => void;
  onToggleMark: (userId: string) => void;
};

const Users: React.FC<UsersProps> = ({ users, onDelete, onToggleMark }) => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [professions, setProfFilter] = React.useState<{}>();

  React.useEffect(() => {
    api.professions.fetchAll().then((data: any[]) => setProfFilter(data));
  }, []);

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleFilterSelect = (filterId: string) => {
    console.log(filterId);
  };

  const usersCrop = paginate(users, currentPage, pageSize);

  if (usersCrop.length === 0 && users.length > 0) {
    setCurrentPage(currentPage - 1);
  }

  return (
    <>
      {professions && (
        <FilterList items={professions} onSelect={handleFilterSelect} />
      )}
      {users.length > 0 && (
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
            {usersCrop.map((user) => (
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
        itemsCount={users.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default Users;
