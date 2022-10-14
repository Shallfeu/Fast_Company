import React from "react";
import { useQuality } from "../../../hooks/useQuality";
import Quality from "./Quality";

type QualitiesListProps = {
  qualities: string[];
};

const QualitiesList: React.FC<QualitiesListProps> = ({ qualities }) => {
  const { loading } = useQuality();
  if (!loading) return <>Loading...</>;

  return (
    <>
      {qualities.map((quality) => (
        <Quality key={quality} id={quality} />
      ))}
    </>
  );
};

export default QualitiesList;
