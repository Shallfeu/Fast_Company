import { RootState } from "../store";

export const getProfessions = () => (state: RootState) =>
  state.professions.items;

export const getProfessionsLoading = () => (state: RootState) =>
  state.professions.loading;

export const getProfessionById =
  (professionId: string) => (state: RootState) => {
    const { items } = state.professions;
    if (items) {
      return items.find((el) => el._id === professionId);
    }
    return null;
  };
