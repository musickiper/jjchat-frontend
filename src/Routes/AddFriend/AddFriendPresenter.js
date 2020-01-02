import React from 'react';
import styled from "styled-components";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Helmet} from "react-helmet";

const Wrapper = styled.div`
  width: 50vh;
  height: 80vh;
  border: 1px solid ${props => props.theme.greyColor};
`;

const List = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 1vh;
`;

const Friend = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px dotted ${props => props.theme.greyColor};
  &:hover {
    background-color: ${props => props.theme.lightGreyColor};
  }
`;

const Username = styled.div`
  font-size: 0.7rem;
`;

const Avatar = styled.div`
  width:8vh;
  height:8vh;
  background-color: ${props => props.theme.greyColor};
  border-radius: 50%;
  img {
    width:100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const AddBtn = styled.div`
  width: 8vh;
  height: 8vh;
  svg {
    width: 100%;
    height: 100%;
    color: ${props => props.theme.blueColor};
    &:hover {
      opacity: 50%;
      cursor: pointer;
    }
  }
`;

const AddFriendPresenter = ({users, me, handleClick}) => {
    return (
        <Wrapper>
            <Helmet>
                <meta charSet={"utf-8"}/>
                <title>Add Friend</title>
            </Helmet>
            <List>
            {users.map(({id, username, nickname, avatar}) => id !== me.id &&
                <Friend key={id}>
                    <Avatar><img src={avatar} alt={""}/></Avatar>
                    <Username>{nickname ? nickname : username}</Username>
                    <AddBtn onClick={() => handleClick(id)}><AddCircleIcon/></AddBtn>
                </Friend>
            )}
            </List>
        </Wrapper>
    );
};

export default AddFriendPresenter;
