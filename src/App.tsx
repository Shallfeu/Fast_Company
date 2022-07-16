import React, { useState } from 'react';
import Users from './components/users';
import SearchStatus from './components/search-status';
import api from './api';

export type StateData = {
  _id: string;
  name: string;
  qualities: { _id: string; name: string; color: string }[];
  profession: { _id: string; name: string };
  completedMeetings: number;
  rate: number;
  bookmark: boolean;
};

function App() {
  const [users, setUsers] = useState<StateData[]>(api.users.fetchAll());

  const handleDelete = (userId: string) => {
    setUsers(
      users.filter((user) => {
        return user?._id !== userId;
      }),
    );
  };

  const handleToggleMark = (userId: string) => {
    const newUsers = users.map((user) => {
      if (user._id === userId) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    setUsers(newUsers);
  };

  return (
    <>
      <SearchStatus length={users.length} />
      <Users users={users} onDelete={handleDelete} onToggleMark={handleToggleMark} />
    </>
  );
}

export default App;
