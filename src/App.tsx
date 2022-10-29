import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Users from "./layouts/Users";

import NavBar from "./components/ui/NavBar";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LogOut from "./layouts/LogOut";

import { loadQualities } from "./redux/qualitiesSlice/qualitySlice";
import { useAppDispatch } from "./redux/store/hooks";
import { loadProfessions } from "./redux/professionSlice/professionSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadQualities());
    dispatch(loadProfessions());
  }, []);

  return (
    <div>
      <AuthProvider>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </AuthProvider>

      <ToastContainer />
    </div>
  );
};

export default App;
