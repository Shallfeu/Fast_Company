import httpService from "./httpService";

const professionEndPoint = "professions/";

const professionService = {
  get: async (id: string) => {
    const { data } = await httpService.get(`${professionEndPoint}${id}`);
    return data;
  },

  fetchAll: async () => {
    const { data } = await httpService.get(professionEndPoint);
    return data;
  },
};

export default professionService;
