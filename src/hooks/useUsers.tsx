import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { IUser } from "../store/usersSlice/slice";

import userService from "../services/userService";
import { useAuth } from "./useAuth";

type IUserContext = {
  users: IUser[];
  getUserById: (userId: string) => IUser | null;
};

type Provider = {
  children?: JSX.Element | JSX.Element[];
};

const UserContext = createContext<IUserContext>({
  users: [],
  getUserById: () => null,
});

export const useUsers = () => useContext(UserContext);

const UserProvider: React.FC<Provider> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (loading && currentUser) {
      const newUsers = [...users];
      const indexNew = newUsers.findIndex((el) => el._id === currentUser._id);
      newUsers[indexNew] = currentUser;
      setUsers(newUsers);
    }
  }, [currentUser]);

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

  const getUserById = (userId: string) => {
    const currentUser = users.find((user) => user._id === userId);
    if (currentUser) return currentUser;
    return null;
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

  const UserProviderValue = useMemo(
    () => ({ users, getUserById }),
    [users, getUserById]
  );

  return (
    <UserContext.Provider value={UserProviderValue}>
      {loading ? children : <h1>Loading...</h1>}
    </UserContext.Provider>
  );
};

export default UserProvider;
