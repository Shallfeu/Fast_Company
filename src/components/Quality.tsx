import React from "react";

type qualitiesData = {
  _id: string;
  name: string;
  color: string;
};

const Quality: React.FC<qualitiesData> = ({ color, name, _id }) => {
  return (
    <span key={_id} className={`badge m-1 bg-${color}`}>
      {name}
    </span>
  );
};

export default Quality;
