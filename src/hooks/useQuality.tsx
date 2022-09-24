import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import qualitieService from "../services/qualityService";

type IQuality = {
  _id: string;
  name: string;
  color: string;
};

type IQualityContext = {
  qualities: IQuality[];
  loading?: boolean;
  getQualityById?: any;
};

type Provider = {
  children?: JSX.Element | JSX.Element[];
};

const QualityContext = React.createContext<IQualityContext>({
  qualities: [],
});

export const useQuality = () => useContext(QualityContext);

export const QualityProvider: React.FC<Provider> = ({ children }) => {
  const [qualities, setQualities] = useState<IQuality[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const errorCatcher = (error: any) => {
    const { message } = error.response.data;
    setError(message);
  };

  const getQualityById = (id: string) => {
    const neededQuality = qualities.find((item) => item._id === id);
    return neededQuality;
  };

  const getQualitiesList = async () => {
    try {
      const { content } = await qualitieService.fetchAll();
      setQualities(content);
      setLoading(true);
    } catch (error) {
      errorCatcher(error);
    }
  };

  useEffect(() => {
    getQualitiesList();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const QualityProviderValue = useMemo(
    () => ({ qualities, loading, getQualityById }),
    [qualities, loading, getQualityById]
  );

  return (
    <QualityContext.Provider value={QualityProviderValue}>
      {loading ? children : <h1>Loading...</h1>}
    </QualityContext.Provider>
  );
};
