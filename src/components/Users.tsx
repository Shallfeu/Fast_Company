import React, { useState } from 'react';
import api from '../api';
import User from './User';

const Users: React.FC = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId: string) => {
    setUsers(
      users.filter((user) => {
        return user?._id !== userId;
      }),
    );
  };

  const renderPhrase = (number: number) => {
    if (number === 0) {
      return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
    }
    if (number === 1 || number > 4) {
      return <span className="badge bg-primary">{number} человек тусанет с тобой сегодня</span>;
    }
    return <span className="badge bg-primary">{number} человек тусанут с тобой сегодня</span>;
  };

  return (
    <>
      <h3>{renderPhrase(users.length)}</h3>
      {users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ _id, name, qualities, profession, completedMeetings, rate }) => (
              <User
                key={_id}
                _id={_id}
                name={name}
                qualities={qualities}
                profession={profession}
                completedMeetings={completedMeetings}
                rate={rate}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
