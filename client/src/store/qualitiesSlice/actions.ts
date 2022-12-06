import qualitiesService from "../../services/qualitiesService";
import { isOutdate } from "../../utils/isOutdate";
import {
  QualitiesRequested,
  QualitiesReceived,
  QualitiesRequestedFailed,
} from "./slice";

export const loadQualities = () => async (dispatch: any, getState: any) => {
  const { lastFetch } = getState().qualities;
  if (isOutdate(lastFetch)) {
    dispatch(QualitiesRequested());
    try {
      const { content } = await qualitiesService.fetchAll();
      dispatch(QualitiesReceived(content));
    } catch (error: any) {
      dispatch(QualitiesRequestedFailed(error.message));
    }
  }
};
