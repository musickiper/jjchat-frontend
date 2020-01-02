import React from "react";
import {Route, Switch} from "react-router-dom";
import Login from "../Routes/Login";
import ProfileContainer from "../Routes/Profile";
import FriendsContainer from "../Routes/Friends";
import AddFriendContainer from "../Routes/AddFriend";
import RoomContainer from "../Routes/Room";
import RoomsContainer from "../Routes/Rooms/RoomsContainer";
import CreateRoom from "../Routes/CreateRoom";

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path={"/"} component={FriendsContainer}/>
        <Route path={"/user/:userId"} component={ProfileContainer}/>
        <Route path={"/addFriend"} component={AddFriendContainer}/>
        <Route path={"/room/:roomId"} component={RoomContainer}/>
        <Route path={"/rooms"} component={RoomsContainer}/>
        <Route path={"/createRoom"} component={CreateRoom}/>
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
