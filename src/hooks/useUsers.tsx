import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

import userService from "../services/userService";

type IUser = {
  _id: string;
  email: string;
  name: string;
  qualities: { _id: string; name: string; color: string }[];
  profession: string;
  completedMeetings: number;
  rate: number;
  bookmark: boolean;
  sex: string;
};

type IUserContext = { users: IUser[] };

type Provider = {
  children?: JSX.Element | JSX.Element[];
};

const UserContext = createContext<IUserContext>({ users: [] });

export const useUsers = () => useContext(UserContext);

const UserProvider: React.FC<Provider> = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const errorCatcher = (error: any) => {
    const { message } = error.response.data;
    setError(message);
  };

  const getUsers = async () => {
    try {
      const { content } = await userService.fetchAll();
      setUsers(content);
      setLoading(true);
    } catch (error) {
      errorCatcher(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  });

  const UserProviderValue = useMemo(() => ({ users }), [users]);

  return (
    <UserContext.Provider value={UserProviderValue}>
      {loading ? children : <h1>Loading...</h1>}
    </UserContext.Provider>
  );
};

export default UserProvider;
