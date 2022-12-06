import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loadQualities } from "../../../store/qualitiesSlice/actions";
import { loadProfessions } from "../../../store/professionsSlice/actions";
import { loadUsers } from "../../../store/usersSlice/actions";
import {
  getLogged,
  getUsersLoadingStatus,
} from "../../../store/usersSlice/selectors";

interface AppLoaderProp {
  children: any;
}

const AppLoader: React.FC<AppLoaderProp> = ({ children }) => {
  const dispatch = useAppDispatch();
  const logged = useAppSelector(getLogged);
  const usersStatus = useAppSelector(getUsersLoadingStatus);

  useEffect(() => {
    dispatch(loadQualities());
    dispatch(loadProfessions());
    if (logged) dispatch(loadUsers());
  }, [logged]);

  if (usersStatus) return <>Loading...</>;

  return children;
};

export default AppLoader;
