import React from "react";
import Quality, { QualityData } from "./Quality";

type QualitiesListProps = {
  qualities: QualityData[];
};

const QualitiesList: React.FC<QualitiesListProps> = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality: QualityData) => (
        <Quality key={quality._id} {...quality} />
      ))}
    </>
  );
};

export default QualitiesList;
