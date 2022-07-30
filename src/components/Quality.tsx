import React from "react";

type QualityData = {
  _id: string;
  name: string;
  color: string;
};

const Quality: React.FC<QualityData> = ({ color, name, _id }) => {
  return (
    <span key={_id} className={`badge m-1 bg-${color}`}>
      {name}
    </span>
  );
};

export default Quality;
