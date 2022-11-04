import axios from "axios";
import localStorageService from "./localStorageService";

const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const regUrl = "accounts:signUp";
const logUrl = "accounts:signInWithPassword";

const authService = {
  register: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { data } = await httpAuth.post(regUrl, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },

  login: async ({ email, password }: { email: string; password: string }) => {
    const { data } = await httpAuth.post(logUrl, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },

  refresh: async () => {
    const { data } = await httpAuth.post(logUrl, {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
