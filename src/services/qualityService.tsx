import httpService from "./httpService";

const qualityEndPoint = "quality/";

const qualityService = {
  get: async (id: string) => {
    const { data } = await httpService.get(`${qualityEndPoint}${id}`);
    return data;
  },

  fetchAll: async () => {
    const { data } = await httpService.get(qualityEndPoint);
    return data;
  },
};

export default qualityService;
