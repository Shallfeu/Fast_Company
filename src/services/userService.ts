import httpService from "./httpService";
import localStorageService from "./localStorageService";

const userEndPoint = "user/";

const userService = {
  fetchAll: async () => {
    const { data } = await httpService.get(userEndPoint);
    return data;
  },

  create: async (payload: { _id: string; email: string; password: string }) => {
    const { data } = await httpService.put(userEndPoint + payload._id, payload);
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndPoint + localStorageService.getUserId()
    );
    return data;
  },
};

export default userService;
