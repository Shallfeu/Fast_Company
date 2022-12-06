import axios from "axios";
import { toast } from "react-toastify";

import configFile from "../config.json";
import authService from "./authService";
import localStorageService from "./localStorageService";

const http = axios.create({ baseURL: configFile.apiEndPoint });

http.interceptors.request.use(
  async (config) => {
    if (configFile.isFireBase) {
      if (!config.url) return;

      const containslash = /\/$/gi.test(config.url);

      config.url = `${
        containslash ? config.url.slice(0, -1) : config.url
      }.json`;

      const expiriesDate = localStorageService.getExpiresToken();
      const refreshToken = localStorageService.getRefreshToken();

      if (refreshToken && expiriesDate < Date.now()) {
        const data = await authService.refresh();

        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          localId: data.user_id,
          expiresIn: data.expires_in,
        });
      }

      const accessToken = localStorageService.getAccessToken();
      if (accessToken) config.params = { ...config.params, auth: accessToken };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const trasformData = (data: any) =>
  data && !data._id
    ? Object.keys(data).map((key) => ({ ...data[key as keyof typeof data] }))
    : data;

http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: trasformData(res.data) };
    }
    return res;
  },
  (error) => {
    const expectedErros =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErros) {
      toast.error("Something went wrong. Try it later :)");
    }

    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
