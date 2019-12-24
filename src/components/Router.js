import React from "react";
import {Route, Switch} from "react-router-dom";
import Login from "../Routes/Login";
import ProfileContainer from "../Routes/Profile";
import FriendsContainer from "../Routes/Friends";

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path={"/"} component={FriendsContainer}/>
        <Route path={"/user/:userId"} component={ProfileContainer}/>
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
