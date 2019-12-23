import React, {useState} from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {gql} from "apollo-boost";
import {useQuery} from "react-apollo-hooks";

const Wrapper = styled.div`
  width: 400px;
  height:90%;
`;

const Input = styled.input`
  width: 400px;
  height: 30px;
  border-radius: ${props => props.theme.borderRadius};
  padding-left: 1rem;
`;

const FriendsList = styled.div`
  height: ${props => props.height}px;
  margin-top: 2rem;
  overflow: scroll;
`;

const Friend = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius};
  border-bottom: 1px solid ${props => props.theme.greyColor};
  &:hover {
    background-color: ${props => props.theme.lightGreyColor};
    cursor: pointer;
  }
`;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:40px;
  height: 40px;
  background-color: ${props => props.theme.greyColor};
  border-radius: 50%;
  img {
    width:100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const Username = styled.div``;

const Bio = styled.div`
  color: ${props => props.theme.greyColor};
`;

const ME = gql`
    query me {
        me {
            id
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

const Friends = ({history}) => {
    const listHeight = window.innerHeight - 200;
    const [term, setTerm] = useState("");
    const {data, loading} = useQuery(ME);

    const handleTerm = (e) => {
        setTerm(e.target.value);
    };

    const handleFriendClick = (id) => {
        history.push(`/user/${id}`);
    };

    if (!loading) {
        const {friends} = data.me;
        const filteredFriends = friends.filter(friend => {
            return friend.username.startsWith(term);
        });
        console.dir(filteredFriends);
        return (
            <Wrapper>
                <Header title={"CHATTING"}/>
                <Input placeholder={"Enter username"} value={term} onChange={handleTerm}/>
                <FriendsList height={listHeight}>
                    {filteredFriends.map(({id, username, nickname, bio, avatar}) =>
                        <Friend key={id} onClick={() => handleFriendClick(id)}>
                            <Avatar><img src={avatar} alt={""}/></Avatar>
                            <Username>{nickname ? nickname : username}</Username>
                            <Bio>{bio}</Bio>
                        </Friend>
                    )}
                </FriendsList>
                <Footer/>
            </Wrapper>
        );
    } else {
        return (
            <Wrapper>Loading...</Wrapper>
        )
    }
};

export default Friends;
