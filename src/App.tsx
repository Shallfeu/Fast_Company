import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Users from "./layouts/Users";

import NavBar from "./components/ui/NavBar";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LogOut from "./layouts/LogOut";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <QualityProvider>
          <ProfessionProvider>
            <Switch>
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route path="/" exact component={Main} />
              <Redirect to="/" />
            </Switch>
          </ProfessionProvider>
        </QualityProvider>
      </AuthProvider>

      <ToastContainer />
    </div>
  );
};

export default App;
