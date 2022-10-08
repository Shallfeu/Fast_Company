import { useEffect, useState } from "react";
import professons from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpService from "../services/httpService";

const useMockData = () => {
  const statusConst = {
    idle: "Not Started",
    pending: "In Process",
    success: "Ready",
    error: "Error occured",
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConst.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = professons.length + qualities.length + users.length;

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const updateProgress = () => {
    if (count !== 0 && status === statusConst.idle)
      setStatus(statusConst.pending);
    const newProgress = Math.floor((count / summaryCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) setStatus(statusConst.success);
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  const initialize = async () => {
    try {
      /* eslint-disable-next-line */
      for (const prof of professons) {
        await httpService.put(`profession/${prof._id}`, prof);
        incrementCount();
      }
      /* eslint-disable-next-line */
      for (const qual of qualities) {
        await httpService.put(`quality/${qual._id}`, qual);
        incrementCount();
      }
      /* eslint-disable-next-line */
      for (const user of users) {
        await httpService.put(`user/${user._id}`, user);
        incrementCount();
      }
    } catch (error: any) {
      setError(error);
      setStatus(statusConst.error);
    }
  };

  return { error, initialize, progress, status };
};

export default useMockData;
