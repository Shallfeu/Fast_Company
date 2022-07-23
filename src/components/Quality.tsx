import React from "react";

type QualityData = {
  _id: string;
  name: string;
  color: string;
};

function Quality({ color, name, _id }: QualityData) {
  return (
    <span key={_id} className={`badge m-1 bg-${color}`}>
      {name}
    </span>
  );
}

export default Quality;
