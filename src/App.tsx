import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Users from "./components/layouts/Users";
import Main from "./components/layouts/Main";
import Login from "./components/layouts/Login";
import UserProfile from "./components/UserProfile";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId" component={UserProfile} />
        <Route path="/users" component={Users} />
      </Switch>
    </>
  );
};

export default App;
