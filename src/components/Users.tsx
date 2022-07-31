import React from "react";

import Pagination from "./Pagination";
import User from "./User";
import GroupList from "./GroupLIst";
import SearchStatus from "./SearchStatus";

import { paginate } from "../utils/paginate";
import api from "../api";
import { StateData } from "../App";

export type UsersProps = {
  users: StateData[];
  onDelete: (userId: string) => void;
  onToggleMark: (userId: string) => void;
};

export type selectedProfProps = {
  _id?: string;
  name?: string;
};

const Users: React.FC<UsersProps> = ({ users, onDelete, onToggleMark }) => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [professions, setProffessions] = React.useState<{}>();
  const [selectedProf, setSelectedProf] = React.useState<selectedProfProps>();

  React.useEffect(() => {
    api.professions.fetchAll().then((data: any[]) => setProffessions(data));
  }, []);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleFilterSelect = (item: selectedProfProps) => {
    setSelectedProf(item);
  };

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession.name === selectedProf.name)
    : users;

  const usersCrop = paginate(filteredUsers, currentPage, pageSize);

  const handleClearFilters = () => {
    setSelectedProf(undefined);
  };

  if (usersCrop.length === 0 && users.length > 0) {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className="d-flex">
      <div className="d-flex flex-column flex-shrink-o p-3">
        {professions && (
          <>
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onSelect={handleFilterSelect}
            />
            <button
              className="btn btn-secondary mt-2"
              type="button"
              onClick={handleClearFilters}
            >
              Сброс
            </button>
          </>
        )}
      </div>

      <div className="d-flex flex-column">
        <SearchStatus length={filteredUsers.length} />

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
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={filteredUsers.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
