import React from "react";
import { useAppSelector } from "../../store/hooks";
import { getProfessionById } from "../../store/professionsSlice/selectors";

type ProfessionProps = {
  id: string;
};

const Profession: React.FC<ProfessionProps> = ({ id }) => {
  const profession = useAppSelector(getProfessionById(id));
  return <>{profession?.name}</>;
};

export default Profession;
