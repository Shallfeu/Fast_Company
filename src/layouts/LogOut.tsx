import React, { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { LoggedOut } from "../store/usersSlice/actions";

const LogOut: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(LoggedOut());
  }, []);

  return <h1>Loading</h1>;
};

export default LogOut;
