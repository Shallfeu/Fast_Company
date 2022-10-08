import httpService from "./httpService";

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
};

export default userService;
