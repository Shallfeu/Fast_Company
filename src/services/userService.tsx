import httpService from "./httpService";

const userEndPoint = "user/";

const userService = {
  fetchAll: async () => {
    const { data } = await httpService.get(userEndPoint);
    return data;
  },
};

export default userService;
