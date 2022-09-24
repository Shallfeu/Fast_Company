import React from "react";
import { useProfession } from "../../hooks/useProfession";

type ProfessionProps = {
  id: string;
};

const Profession: React.FC<ProfessionProps> = ({ id }) => {
  const { loading, getProfessionById } = useProfession();
  const profession = getProfessionById(id);
  return loading ? <>{profession.name}</> : <>Loading...</>;
};

export default Profession;
