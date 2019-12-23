import React from "react";
import {Route, Switch} from "react-router-dom";
import Friends from "../Routes/Friends";
import Login from "../Routes/Login";
import Profile from "../Routes/Profile";

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path={"/"} component={Friends}/>
        <Route path={"/user/:userId"} component={Profile}/>
    </Switch>
);

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path={"/"} component={Login}/>
    </Switch>
);

const AppRouter = ({isLoggedIn}) =>
    isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/>;

export default AppRouter;
