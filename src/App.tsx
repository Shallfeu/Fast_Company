import React, { useState } from "react";
import api from "./api";
import Users from "./components/Users";

export type StateData = {
  _id: string;
  name: string;
  qualities: { _id: string; name: string; color: string }[];
  profession: { _id: string; name: string };
  completedMeetings: number;
  rate: number;
  bookmark: boolean;
};

const App = () => {
  const [users, setUsers] = useState<StateData[]>([]);

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

  return (
    <Users
      users={users}
      onDelete={handleDelete}
      onToggleMark={handleToggleMark}
    />
  );
};

export default App;
