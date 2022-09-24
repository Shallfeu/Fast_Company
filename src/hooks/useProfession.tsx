import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import professionService from "../services/professionService";

type IProfession = {
  _id: string;
  name: string;
};

type IProfessionContext = {
  professions: IProfession[];
  loading?: boolean;
  getProfessionById?: any;
};

type Provider = {
  children?: JSX.Element | JSX.Element[];
};

const ProfessionContext = React.createContext<IProfessionContext>({
  professions: [],
});

export const useProfession = () => useContext(ProfessionContext);

export const ProfessionProvider: React.FC<Provider> = ({ children }) => {
  const [professions, setProfessions] = useState<IProfession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const errorCatcher = (error: any) => {
    const { message } = error.response.data;
    setError(message);
  };

  const getProfessionById = (id: string) => {
    const neededProf = professions.find((item) => item._id === id);
    return neededProf;
  };

  const getProfessionsList = async () => {
    try {
      const { content } = await professionService.fetchAll();
      setProfessions(content);
      setLoading(true);
    } catch (error) {
      errorCatcher(error);
    }
  };

  useEffect(() => {
    getProfessionsList();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const ProfessionProviderValue = useMemo(
    () => ({ professions, loading, getProfessionById }),
    [professions, loading, getProfessionById]
  );

  return (
    <ProfessionContext.Provider value={ProfessionProviderValue}>
      {loading ? children : <h1>Loading...</h1>}
    </ProfessionContext.Provider>
  );
};
