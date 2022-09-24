import React from "react";
import Quality from "./Quality";

type QualitiesListProps = {
  qualities: string[];
};

const QualitiesList: React.FC<QualitiesListProps> = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality: string) => (
        <Quality key={quality} id={quality} />
      ))}
    </>
  );
};

export default QualitiesList;
