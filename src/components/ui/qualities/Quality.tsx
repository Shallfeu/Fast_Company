import React from "react";
import { useQuality } from "../../../hooks/useQuality";

type QualityProps = {
  id: string;
};

const Quality: React.FC<QualityProps> = ({ id }) => {
  const { loading, getQualityById } = useQuality();
  const quality = getQualityById(id);

  return loading ? (
    <span key={quality.id} className={`badge m-1 bg-${quality.color}`}>
      {quality.name}
    </span>
  ) : (
    <>Loading...</>
  );
};

export default Quality;
