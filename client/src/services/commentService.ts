import { IComment } from "../store/commentsSlice/slice";
import httpService from "./httpService";

const commentEndPoint = "comment/";

const commentsService = {
  create: async (payload: IComment) => {
    const { data } = await httpService.put(
      commentEndPoint + payload._id,
      payload
    );
    return data;
  },

  fetchAll: async (pageId: string) => {
    const { data } = await httpService.get(commentEndPoint, {
      params: {
        orderBy: '"pageId"',
        equalTo: `"${pageId}"`,
      },
    });
    return data;
  },

  remove: async (commentId: string) => {
    const { data } = await httpService.delete(commentEndPoint + commentId);
    return data;
  },
};

export default commentsService;
