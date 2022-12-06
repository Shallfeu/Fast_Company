import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getDataStatus } from "../../../store/usersSlice/selectors";
import { loadUsers } from "../../../store/usersSlice/actions";

interface UsersLoaderProp {
  children: any;
}

const UsersLoader: React.FC<UsersLoaderProp> = ({ children }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getDataStatus);

  useEffect(() => {
    if (!status) {
      dispatch(loadUsers());
    }
  }, []);

  if (!status) return <>Loading...</>;

  return children;
};

export default UsersLoader;
