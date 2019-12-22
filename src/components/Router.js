import React from "react";
import { Route, Switch } from "react-router-dom";
import Friends from "../Routes/Friends";
import Login from "../Routes/Login";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path={"/"} component={Friends} />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route path={"/"} component={Login} />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

export default AppRouter;
