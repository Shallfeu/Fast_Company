import qualitiesService from "../../services/qualitiesService";
import { isOutdate } from "../../utils/isOutdate";
import {
  qualitiesRequested,
  qualitiesReceived,
  qualitiesRequestedFailed,
} from "./slice";

export const loadQualities = () => async (dispatch: any, getState: any) => {
  const { lastFetch } = getState().qualities;
  if (isOutdate(lastFetch)) {
    dispatch(qualitiesRequested());
    try {
      const { content } = await qualitiesService.fetchAll();
      dispatch(qualitiesReceived(content));
    } catch (error: any) {
      dispatch(qualitiesRequestedFailed(error.message));
    }
  }
};
