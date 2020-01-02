import React, {useState} from 'react';
import {gql} from "apollo-boost";
import {useMutation, useQuery} from "react-apollo-hooks";
import {toast} from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import CreateRoomPresenter from "./CreateRoomPresenter";


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

// Create a room with users
const CREATE_ROOM = gql`
    mutation createRoom($toIds:[String!]!) {
        createRoom(toIds:$toIds) {
            id
        }
    }
`;


const CreateRoomContainer = ({history}) => {
        const [userIds, setUserIds] = useState([]);
        const {data, loading} = useQuery(ALL_USERS_AND_ME);

        // Create Room
        const createRoom = useMutation(CREATE_ROOM)[0];

        const handleClick = async (userId) => {
            if (userIds.includes(userId)) {
                await setUserIds(prev => prev.filter(id => id !== userId));
            } else {
                await setUserIds(prev => [...prev, userId]);
            }
        };

        const handleSubmit = async () => {
            if (userIds.length === 0) {
                toast.error("You must choose at least one friend to create a room");
                return;
            }
            try {
                const {
                    data: {createRoom: {id}}
                } = await createRoom({
                    variables: {
                        toIds: [data.me.id, ...userIds]
                    }
                });
                history.push(`/room/${id}`);
            } catch
                (e) {
                console.error(e);
            }
        };

        if (!loading && data.allUsers) {
            const {allUsers: users, me} = data;
            return <CreateRoomPresenter users={users} me={me} userIds={userIds} handleClick={handleClick}
                                        handleSubmit={handleSubmit}/>;
        } else {
            return <CircularProgress/>;
        }
    }
;

export default CreateRoomContainer;
