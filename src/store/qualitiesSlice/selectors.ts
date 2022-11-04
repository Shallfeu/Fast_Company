import { RootState } from "../store";

export const getQualities = () => (state: RootState) => state.qualities.items;

export const getQualitiesLoading = () => (state: RootState) =>
  state.qualities.loading;

export const getQualitiesByIds =
  (qualitiesIds: string[]) => (state: RootState) => {
    const result = [];
    if (state.qualities.items)
      for (const i of qualitiesIds) {
        for (const j of state.qualities.items) {
          if (i === j._id) {
            result.push(j);
          }
        }
      }
    return result;
  };

export const getQualityById = (id: string) => (state: RootState) =>
  state.qualities.items?.find((el) => el._id === id) || {
    name: "string",
    _id: "string",
    color: "string",
  };
