import { createAction } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import {
  UsersRequested,
  UsersReceived,
  UsersRequestedFailed,
  AuthRequestFailed,
  AuthRequestSuccess,
  CreateUserRequestSuccess,
  UserLogOut,
  UpdateUsers,
} from "./slice";
import authService from "../../services/authService";
import localStorageService from "../../services/localStorageService";
import { randomInt } from "../../utils/randomInt";
import { customHistory } from "../../utils/history";
import { generateAuthError } from "../../utils/genarateAutherror";

const AuthRequest = createAction("users/AuthRequest");
const CreateUserRequest = createAction("users/CreateUserRequest");
const CreateUserRequestFailed = createAction("users/CreateUserRequestFailed");

export const loadUsers = () => async (dispatch: any) => {
  try {
    dispatch(UsersRequested());
    const { content } = await userService.fetchAll();
    dispatch(UsersReceived(content));
  } catch (error: any) {
    dispatch(UsersRequestedFailed(error.message));
  }
};

export const signIn =
  ({
    email,
    password,
    redirect,
  }: {
    email: string;
    password: string;
    redirect: string;
  }) =>
  async (dispatch: any) => {
    try {
      dispatch(AuthRequest());
      const data = await authService.login({ email, password });
      dispatch(AuthRequestSuccess({ userId: data.localId }));
      localStorageService.setTokens(data);
      if (redirect) customHistory.push(redirect);
      else customHistory.push("/users");
    } catch (error: any) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(AuthRequestFailed(errorMessage));
      } else {
        dispatch(AuthRequestFailed(error.message));
      }
    }
  };

export const signUp =
  ({ email, password, ...rest }: { email: string; password: string }) =>
  async (dispatch: any) => {
    try {
      dispatch(AuthRequest());
      const data = await authService.register({ email, password });
      localStorageService.setTokens(data);
      dispatch(AuthRequestSuccess({ userId: data.localId }));
      dispatch(
        createUser({
          _id: data.localId,
          email,
          password,
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          rate: randomInt(1, 5),
          completedMeetings: randomInt(0, 200),
          ...rest,
        })
      );
    } catch (error: any) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(AuthRequestFailed(errorMessage));
      } else {
        dispatch(AuthRequestFailed(error.message));
      }
    }
  };

const createUser =
  (data: {
    _id: string;
    email: string;
    password: string;
    image: string;
    rate: number;
    completedMeetings: number;
  }) =>
  async (dispatch: any) => {
    try {
      dispatch(CreateUserRequest());
      const { content } = await userService.create(data);
      dispatch(CreateUserRequestSuccess(content));
      customHistory.push("/users");
    } catch (error: any) {
      dispatch(CreateUserRequestFailed());
    }
  };

export const LoggedOut = () => (dispatch: any) => {
  localStorageService.removeAuthData();
  dispatch(UserLogOut());
  customHistory.push("/");
};

export const UpdateData = (data: any) => async (dispatch: any) => {
  try {
    const { content } = await userService.update(data);
    dispatch(UpdateUsers(content));
  } catch (error) {
    dispatch(CreateUserRequestFailed());
  }
};
