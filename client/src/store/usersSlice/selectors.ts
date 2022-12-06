import { RootState } from "../store";

export const getUsers = (state: RootState) => state.users.items;

export const getUsersLoading = (state: RootState) => state.users.loading;

export const getCurrentUserData = (state: RootState) =>
  state.users.items?.find((el) => el._id === state.users.auth?.userId);

export const getUserById = (userId: string) => (state: RootState) => {
  const { items } = state.users;
  if (items) {
    return items.find((el) => el._id === userId);
  }
  return null;
};

export const getLogged = (state: RootState) => state.users.logged;
export const getUsersLoadingStatus = (state: RootState) => state.users.loading;
export const getDataStatus = (state: RootState) => state.users.dataLoaded;
export const getCurrentUserId = (state: RootState) => state.users.auth?.userId;
export const getAuthErrors = (state: RootState) => state.users.error;
