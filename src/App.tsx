import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Users from "./layouts/Users";

import NavBar from "./components/ui/NavBar";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";

const App = () => {
  return (
    <>
      <NavBar />
      <QualityProvider>
        <ProfessionProvider>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:userId?/:edit?" component={Users} />
          </Switch>
        </ProfessionProvider>
      </QualityProvider>
      <ToastContainer />
    </>
  );
};

export default App;
