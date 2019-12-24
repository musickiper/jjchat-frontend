import React from "react";
import {Route, Switch} from "react-router-dom";
import Login from "../Routes/Login";
import Profile from "../Routes/Profile";
import FriendsContainer from "../Routes/Friends/FriendsContainer";

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path={"/"} component={FriendsContainer}/>
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
