import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import localStorageService from "../services/localStorageService";
import userService from "../services/userService";

type IAuthContext = {
  signUp: ({ email, password }: { email: string; password: string }) => void;
  signIn: ({ email, password }: { email: string; password: string }) => void;
  updateData: (data: any) => void;
  logOut: () => void;
  currentUser: User | null;
};

type Provider = {
  children?: JSX.Element | JSX.Element[];
};

export type User = {
  completedMeetings: number;
  email: string;
  image: string;
  licence: boolean;
  name: string;
  password: string;
  profession: string;
  quality: string[];
  rate: number;
  sex: string;
  _id: string;
  bookmark: boolean;
};

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const AuthContext = createContext<IAuthContext>({
  signUp: async () => "void",
  signIn: async () => "void",
  updateData: async () => "void",
  logOut: () => "void",
  currentUser: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<Provider> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const errorCatcher = (error: any) => {
    const { message } = error.response.data;
    setError(message);
  };

  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const createUser = async (data: {
    _id: string;
    email: string;
    password: string;
    image: string;
    rate: number;
    completedMeetings: number;
  }) => {
    try {
      const { content } = await userService.create(data);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(true);
    }
  };

  const updateData = async (data: any) => {
    try {
      const { content } = await userService.update(data);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getUserData = async () => {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(true);
    }
  };

  const signUp = async ({
    email,
    password,
    ...rest
  }: {
    email: string;
    password: string;
  }) => {
    const url = "accounts:signUp";

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      localStorageService.setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        password,
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        ...rest,
      });
    } catch (error: any) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email уже существует",
          };
          throw errorObject;
        }
      }
    }
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const url = "accounts:signInWithPassword";

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      localStorageService.setTokens(data);
      await getUserData();
    } catch (error: any) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        switch (message) {
          case "EMAIL_NOT_FOUND":
            throw {
              email: "Пользователя с таким Email не существует",
            };

          case "INVALID_PASSWORD":
            throw {
              password: "Неверный пароль",
            };

          default:
            throw {
              manyAttempts: "Слишком много попыток входа, попробуйте позже",
            };
        }
      }
    }
  };

  const logOut = () => {
    localStorageService.removeAuthData();
    setCurrentUser(null);
    history.push("/");
  };

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else setLoading(true);
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const AuthProviderValue = useMemo(
    () => ({ signUp, signIn, currentUser, logOut, updateData }),
    [signUp, signIn, currentUser, logOut, updateData]
  );

  return (
    <AuthContext.Provider value={AuthProviderValue}>
      {loading ? children : <>Loading...</>}
    </AuthContext.Provider>
  );
};
