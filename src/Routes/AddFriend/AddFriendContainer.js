import React from 'react';
import AddFriendPresenter from "./AddFriendPresenter";
import {gql} from "apollo-boost";
import {useMutation, useQuery} from "react-apollo-hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import {toast} from "react-toastify";

// Queries
// Get all users and my info
const ALL_USERS_AND_ME = gql`
    query allUsers {
        allUsers {
            id
            username
            nickname
            avatar
        }
        me {
            id
        }
    }
`;

// Add user to my friends list
const ADD_FRIEND = gql`
    mutation addFriend($friendId: String!) {
        addFriend(friendId: $friendId){
            id
        }
    }
`;

const AddFriendContainer = ({history}) => {
    const {data, loading} = useQuery(ALL_USERS_AND_ME);
    const addFriend = useMutation(ADD_FRIEND)[0];

    const handleClick = async (id) => {
        try {
            await addFriend({variables: {friendId: id}});
            await history.push("/");
            await window.location.reload();
        } catch (e) {
            toast.error("Add Friend failed");
        }
    };

    if (!loading && data.allUsers) {
        const {allUsers: users, me} = data;
        return <AddFriendPresenter users={users} me={me} handleClick={handleClick}/>;
    } else {
        return <CircularProgress/>;
    }
};

export default AddFriendContainer;
