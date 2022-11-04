import React, { useEffect } from "react";
import {
  getQualitiesLoading,
  getQualitiesByIds,
} from "../../../store/qualitiesSlice/selectors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Quality from "./Quality";
import { loadQualities } from "../../../store/qualitiesSlice/actions";

type QualitiesListProps = {
  qualities: string[];
};

const QualitiesList: React.FC<QualitiesListProps> = ({ qualities }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadQualities());
  }, []);

  const loading = useAppSelector(getQualitiesLoading());
  const qualitiesList = useAppSelector(getQualitiesByIds(qualities));

  if (!loading) return <>Loading...</>;
  return (
    <>
      {qualitiesList.map((quality) => (
        <Quality key={quality._id} data={quality} />
      ))}
    </>
  );
};

export default QualitiesList;
