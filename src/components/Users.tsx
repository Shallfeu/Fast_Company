import React from "react";
import _ from "lodash";

import Pagination from "./Pagination";
import GroupList from "./GroupLIst";
import SearchStatus from "./SearchStatus";

import { paginate } from "../utils/paginate";
import api from "../api";
import UsersTable from "./UsersTable";

export type selectedProfProps = {
  _id?: string;
  name?: string;
};

export type StateData = {
  _id: string;
  name: string;
  qualities: { _id: string; name: string; color: string }[];
  profession: { _id: string; name: string };
  completedMeetings: number;
  rate: number;
  bookmark: boolean;
};

const Users: React.FC = () => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [professions, setProffessions] = React.useState<{}>();
  const [selectedProf, setSelectedProf] = React.useState<selectedProfProps>();
  const [sortBy, setSortBy] = React.useState<{
    path: string;
    order: "asc" | "desc";
  }>({
    path: "string",
    order: "asc",
  });

  const [users, setUsers] = React.useState<StateData[]>([]);

  React.useEffect(() => {
    api.users.fetchAll().then((data: any[]) => setUsers(data));
  }, []);

  const handleDelete = (userId: string) => {
    setUsers(users.filter((user) => user?._id !== userId));
  };

  const handleToggleMark = (userId: string) => {
    setUsers(
      users.map((user) => {
        if (user._id === userId) {
          user.bookmark = !user.bookmark;
        }
        return user;
      })
    );
  };

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
    setCurrentPage(currentPage - 1);
  };

  const handleSort = (item: { path: string; order: "asc" | "desc" }) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession.name === selectedProf.name)
      : users;

    const sortedUSers = _.orderBy(filteredUsers, [sortBy.path], sortBy.order);

    const usersCrop = paginate(sortedUSers, currentPage, pageSize);

    const handleClearFilters = () => {
      setSelectedProf(undefined);
    };

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
          {users.length > 0 && <SearchStatus length={users.length} />}

          {users.length > 0 && (
            <UsersTable
              users={usersCrop}
              currentSort={sortBy}
              onDelete={handleDelete}
              onToggleMark={handleToggleMark}
              onSort={handleSort}
            />
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
  }
  return <h1>Loading...</h1>;
};

export default Users;
