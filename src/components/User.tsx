import React from 'react';
import Qualitie from './qualitie';
import BookMark from './bookmark';
import { StateData } from '../App';

export type UserProps = {
  user: StateData;
  onDelete: (userId: string) => void;
  onToggleMark: (userId: string) => void;
};

const User: React.FC<UserProps> = ({ user, onDelete, onToggleMark }) => {
  const { _id, name, qualities, profession, completedMeetings, rate, bookmark } = user;
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>
          {qualities.map((qualitie: any) => (
            <Qualitie key={qualitie._id} {...qualitie} />
          ))}
        </td>
        <td>{profession.name}</td>
        <td>{completedMeetings}</td>
        <td>{rate}/5</td>
        <td>
          <BookMark _id={_id} status={bookmark} onToggleMark={onToggleMark} />
        </td>
        <td>
          <button type="button" className="btn btn-danger" onClick={() => onDelete(_id)}>
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default User;
