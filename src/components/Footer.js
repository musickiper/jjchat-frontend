import React from 'react';
import styled from 'styled-components';
import {Chats, Friends} from "./Icons";
import {withRouter} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-around;
  background-color: ${props => props.theme.lightGreyColor};
  border-radius: ${props => props.theme.borderRadius};
`;

const Link = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.5rem;
  width:40px;
  height:40px;
  background-color: ${props => props.theme.lightGreyColor};
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
`;

const Footer = ({history}) => {
    const handleFriendsClick = () => {
        history.push("/");
    };

    const handleChatsClick = () => {
        history.push("/chats");
    };

    return (
        <Wrapper>
            <Link onClick={handleFriendsClick}><Friends/></Link>
            <Link onClick={handleChatsClick}><Chats/></Link>
        </Wrapper>
    );
};

export default withRouter(Footer);
