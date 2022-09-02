import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";

import Pagination from "../Pagination";
import GroupList from "../GroupLIst";
import SearchStatus from "../SearchStatus";

import { paginate } from "../../utils/paginate";
import api from "../../api";
import UsersTable from "../UsersTable";

export type ProfProps = {
  _id?: string;
  name?: string;
};

export type ProfObjectProps = {
  key: ProfProps;
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

interface Props {}

const Users: React.FC<Props> = () => {
  const pageSize = 4;

  const [searchString, setSearchString] = useState<string>("");

  const searchRef = useRef<HTMLInputElement>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [professions, setProfessions] = useState<
    ProfProps[] | ProfObjectProps
  >();

  const [selectedProf, setSelectedProf] = React.useState<ProfProps | null>(
    null
  );

  const [sortBy, setSortBy] = useState<{
    path: string;
    order: "asc" | "desc";
  }>({
    path: "string",
    order: "asc",
  });

  const [users, setUsers] = React.useState<StateData[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.users
      .fetchAll()
      .then((data: StateData[]) => setUsers(data))
      .then(() =>
        api.professions
          .fetchAll()
          .then((data: ProfProps[] | ProfObjectProps) => setProfessions(data))
          .finally(() => setLoading(false))
      );
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  if (loading) return <h1>Loading...</h1>;

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

  const handleSearch = () => {
    setSelectedProf(null);
    if (searchRef?.current) {
      setSearchString(searchRef.current.value);
    }
  };

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleFilterSelect = (item: ProfProps) => {
    if (searchRef?.current) {
      searchRef.current.value = "";
    }
    setSearchString("");
    setSelectedProf(item);
    setCurrentPage(currentPage - 1);
  };

  const handleSort = (item: { path: string; order: "asc" | "desc" }) =>
    setSortBy(item);

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession.name === selectedProf.name)
    : users.filter((user) =>
        user.name.toLowerCase().includes(searchString.toLowerCase())
      );

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], sortBy.order);

  const usersCrop = paginate(sortedUsers, currentPage, pageSize);

  const handleClearFilters = () => setSelectedProf(null);

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
        {users.length > 0 && <SearchStatus length={usersCrop.length} />}
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          ref={searchRef}
        />
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
};

export default Users;
