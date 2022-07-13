import React from 'react';

type qualitiesData = {
  _id: string;
  name: string;
  color: string;
};

type professionData = {
  _id: string;
  name: string;
};

type UsersProps = {
  _id: string;
  name: string;
  qualities: qualitiesData[];
  profession: professionData;
  completedMeetings: number;
  rate: number;
  onDelete: (userId: string) => void;
};

const User: React.FC<UsersProps> = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
}) => {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>
          {qualities.map(({ _id, name, color }) => (
            <span key={_id} className={'badge m-1 bg-' + color}>
              {name}
            </span>
          ))}
        </td>
        <td>{profession.name}</td>
        <td>{completedMeetings}</td>
        <td>{rate}/5</td>
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
