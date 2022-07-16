import React from 'react';
import User from './user';
import { StateData } from '../App';

export type UsersProps = {
  users: StateData[];
  onDelete: (userId: string) => void;
  onToggleMark: (userId: string) => void;
};

const Users: React.FC<UsersProps> = ({ users, onDelete, onToggleMark }) => {
  return (
    <>
      {users.length !== 0 && (
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
            {users.map((user) => (
              <User key={user._id} onDelete={onDelete} onToggleMark={onToggleMark} user={user} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
