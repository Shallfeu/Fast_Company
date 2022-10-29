import React from "react";
import { useAppSelector } from "../../redux/store/hooks";
import { getProfessionById } from "../../redux/professionSlice/professionSlice";

type ProfessionProps = {
  id: string;
};

const Profession: React.FC<ProfessionProps> = ({ id }) => {
  const profession = useAppSelector(getProfessionById(id));
  return <>{profession?.name}</>;
};

export default Profession;
