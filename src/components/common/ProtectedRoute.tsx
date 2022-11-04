import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { getLogged } from "../../store/usersSlice/selectors";

type ProtectedRouteProps = {
  path: string;
  location?: any;
  component: any;
  children?: any;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  children,
  ...rest
}) => {
  const logged = useAppSelector(getLogged);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!logged)
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );

        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

export default ProtectedRoute;
