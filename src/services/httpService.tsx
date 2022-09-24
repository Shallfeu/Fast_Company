import axios from "axios";
import { toast } from "react-toastify";

import config from "../config.json";

axios.defaults.baseURL = config.apiEndPoint;

axios.interceptors.response.use(
  (res) => res,
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
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
