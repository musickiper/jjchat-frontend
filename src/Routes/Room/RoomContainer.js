import React, {useEffect, useState} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {gql} from "apollo-boost";
import {useMutation, useQuery, useSubscription} from "react-apollo-hooks";
import RoomPresenter from "./RoomPresenter";

const ROOM_BY_ID_AND_ME = gql`
    query roomById($roomId: String!) {
        roomById(roomId: $roomId) {
            id
            participants {
                id
                avatar
                username
                nickname
            }
            messages {
                id
                text
                createdAt
                user {
                    id
                    avatar
                    username
                    nickname
                }
            }
        }
        me {
            id
        }
    }
`;

const SEND_MESSAGE = gql`
    mutation sendMessage($roomId: String!, $text: String!) {
        sendMessage(roomId: $roomId, text: $text) {
            id
            text
            createdAt
            user {
                id
                avatar
                username
                nickname
            }
        }
    }
`;

const NEW_MESSAGE_SUB = gql`
    subscription newMessage($roomId: String!) {
        newMessage(roomId: $roomId) {
            id
            text
            createdAt
            user {
                id
                avatar
                username
                nickname
            }
        }
    }
`;

const RoomContainer = ({match, history}) => {
    const {roomId} = match.params;
    const [myId, setMyId] = useState("");
    const [locParticipants, setLocParticipants] = useState([]);
    const [locMessages, setLocMessages] = useState([]);
    const [newMessageByMe, setNewMessageByMe] = useState("");
    const {data: roomByIdAndMeData, loading} = useQuery(ROOM_BY_ID_AND_ME, {variables: {roomId}});
    const sendMessage = useMutation(SEND_MESSAGE)[0];
    const {data: newMessageByOthersData} = useSubscription(NEW_MESSAGE_SUB, {variables: {roomId: roomId}});

    // Set up initial participants & messages data of the room
    useEffect(() => {
        if (roomByIdAndMeData) {
            const {participants, messages} = roomByIdAndMeData.roomById;
            const {id} = roomByIdAndMeData.me;
            setMyId(id);
            setLocMessages([...messages]);
            setLocParticipants([...participants]);
        }
    }, [roomByIdAndMeData]);

    // Update messages whenever other users send a message to the room
    useEffect(() => {
        if (newMessageByOthersData) {
            const {newMessage} = newMessageByOthersData;
            setLocMessages(prev => [...prev, newMessage]);
        }
    }, [newMessageByOthersData]);

    // When I send a new message to the room
    const handleSubmit = async (e) => {
        if (e.key === "Enter") {
            await sendMessage({
                variables: {
                    roomId,
                    text: newMessageByMe
                }
            });
            setNewMessageByMe("");
        }
    };

    const handleClick = async () => {
        history.push("/rooms");
        window.location.reload();
    };

    // Parsing title using participants data and myId
    const parseTitle = (myId, participants) => {
        if (participants.length === 2) {
            const {nickname} = participants.filter(({id}) => id !== myId)[0];
            return nickname;
        } else {
            return `Group Chatting ${participants.length}`;
        }
    };

    // Parsing date
    const parseTime = (date) => {
        const d = new Date(date);
        return [d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()];
    };

    // When participants exist => initial data has set up
    if (!loading && locParticipants.length !== 0) {
        return (
            <RoomPresenter
                myId={myId}
                parseTitle={parseTitle}
                parseTime={parseTime}
                participants={locParticipants}
                messages={locMessages}
                message={newMessageByMe}
                setMessage={setNewMessageByMe}
                handleSubmit={handleSubmit}
                handleClick={handleClick}
            />
        );
    } else {
        return (
            <div>
                <CircularProgress/>
            </div>
        );
    }
};

export default RoomContainer;
