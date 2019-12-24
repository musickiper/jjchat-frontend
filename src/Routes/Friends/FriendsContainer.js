import {gql} from "apollo-boost";
import React, {useState} from "react";
import {useQuery} from "react-apollo-hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import FriendsPresenter from "./FriendsPresenter";

const ME = gql`
    query me {
        me {
            id
            avatar
            friends {
                id
                username
                nickname
                bio
                avatar
            }
        }
    }
`;

const FriendsContainer = ({history}) => {
        const [term, setTerm] = useState("");
        const {data, loading} = useQuery(ME);

        const handleChange = (e) => {
            setTerm(e.target.value);
        };

        const handleClick = (link) => {
            history.push(link);
        };

        const filteringFriends = (friends) => {
            return friends.filter(friend => friend.username.startsWith(term));
        };

        if (!loading && data.me) {
            const {id:myId, avatar, friends} = data.me;
            return (
                <FriendsPresenter
                    myId={myId}
                    avatar={avatar}
                    friends={filteringFriends(friends)}
                    term={term}
                    handleClick={handleClick}
                    handleChange={handleChange}
                />
            );
        } else {
            return (
                <div>
                    <CircularProgress/>
                </div>
            );
        }
    }
;

export default FriendsContainer;
