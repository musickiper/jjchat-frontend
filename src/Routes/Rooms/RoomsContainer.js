import React from 'react';
import {gql} from "apollo-boost";
import {useQuery} from "react-apollo-hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import RoomsPresenter from "./RoomsPresenter";

const MY_ROOMS = gql`
    query myRooms {
        myRooms {
            id
            participants {
                id
                nickname
                avatar
            }
            messages {
                text
            }
            createdAt
        }
    }
`;

const RoomsContainer = ({history}) => {
    const {data, loading} = useQuery(MY_ROOMS);

    const handleClick = (link) => {
        history.push(link);
    };

    const parseDate = (date) => {
        const d = new Date(date);
        return `${d.getMonth()}/${d.getDate()}`;
    };

    if (!loading && data.myRooms) {
        const {myRooms: rooms} = data;
        return <RoomsPresenter rooms={rooms} parseDate={parseDate} handleClick={handleClick}/>;
    } else {
        return (
            <div>
                <CircularProgress/>
            </div>
        );
    }
};

export default RoomsContainer;
