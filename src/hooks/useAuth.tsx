import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import localStorageService from "../services/localStorageService";
import userService from "../services/userService";

type IAuthContext = {
  signUp: ({ email, password }: { email: string; password: string }) => void;
  signIn: ({ email, password }: { email: string; password: string }) => void;
};

type Provider = {
  children?: JSX.Element | JSX.Element[];
};

const httpAuth = axios.create();

const AuthContext = createContext<IAuthContext>({
  signUp: () => "void",
  signIn: () => "void",
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<Provider> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const errorCatcher = (error: any) => {
    const { message } = error.response.data;
    setError(message);
  };

  const createUser = async (data: {
    _id: string;
    email: string;
    password: string;
  }) => {
    try {
      const { content } = await userService.create(data);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
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
    const keyFireBase = process.env.REACT_APP_FIREBASE_KEY;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${keyFireBase}`;

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      localStorageService.setTokens(data);
      await createUser({ _id: data.localId, email, password, ...rest });
      console.log(data);
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
    const keyFireBase = process.env.REACT_APP_FIREBASE_KEY;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${keyFireBase}`;

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      localStorageService.setTokens(data);
      console.log(data);
    } catch (error: any) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_NOT_FOUND") {
          const errorObject = {
            email: "Пользователя с таким Email не существует",
          };

          throw errorObject;
        }
        if (message === "INVALID_PASSWORD") {
          const errorObject = {
            password: "Неверный пароль",
          };

          throw errorObject;
        }
      }
    }
  };

  const AuthProviderValue = useMemo(
    () => ({ signUp, signIn, currentUser }),
    []
  );

  return (
    <AuthContext.Provider value={AuthProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};
