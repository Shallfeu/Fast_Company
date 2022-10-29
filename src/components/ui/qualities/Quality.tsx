import React from "react";

type QualityProps = {
  data: {
    name: string;
    _id: string;
    color: string;
  };
};

const Quality: React.FC<QualityProps> = ({ data }) => {
  const { _id, color, name } = data;

  return (
    <span key={_id} className={`badge m-1 bg-${color}`}>
      {name}
    </span>
  );
};

export default Quality;
