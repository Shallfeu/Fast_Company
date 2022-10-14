import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

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
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser)
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
