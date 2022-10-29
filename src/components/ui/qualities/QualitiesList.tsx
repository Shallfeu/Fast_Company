import React, { useEffect } from "react";
import {
  getQualitiesLoading,
  loadQualities,
  getQualitiesByIds,
} from "../../../redux/qualitiesSlice/qualitySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import Quality from "./Quality";

type QualitiesListProps = {
  qualities: string[];
};

const QualitiesList: React.FC<QualitiesListProps> = ({ qualities }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadQualities());
  }, []);

  const loading = useAppSelector(getQualitiesLoading());
  if (!loading) return <>Loading...</>;
  const qualitiesList = useAppSelector(getQualitiesByIds(qualities));

  return (
    <>
      {qualitiesList.map((quality) => (
        <Quality key={quality._id} data={quality} />
      ))}
    </>
  );
};

export default QualitiesList;
