import React from "react";
import styled from "styled-components";
import AddIcon from '@material-ui/icons/Add';
import PeopleIcon from '@material-ui/icons/People';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const Wrapper = styled.div`
  width: 50vh;
  height: 80vh;
  border: 1px solid ${props => props.theme.greyColor};
`;

const Header = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  padding: 1vh;
  border-bottom: 1px solid ${props => props.theme.greyColor};
`;

const TitleBox = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width:100%;
  height: ${props => props.theme.inputHeight};
  border-radius: ${props => props.theme.borderRadius};
  padding-left: 1rem;
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
    cursor: pointer;
    &:hover {
      opacity: 50%;
    }
  }
`;

const Title = styled.div`
  width: 20vh;
`;

const Body = styled.div`
  width: 100%;
  height: 48vh;
  overflow: scroll;
  padding: 1vh;
`;

const Friend = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px dotted ${props => props.theme.greyColor};
  &:hover {
    background-color: ${props => props.theme.lightGreyColor};
    cursor: pointer;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 12vh;
  border-top: 1px solid ${props => props.theme.greyColor};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Username = styled.div`
  font-size: 0.7rem;
`;

const Bio = styled.div`
  font-size: 0.5rem;
  color: ${props => props.theme.greyColor};
`;

const Link = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8vh;
  height: 8vh;
  background-color: ${props => props.theme.lightGreyColor};
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
`;

const FriendsPresenter = ({myId, avatar, friends, term, handleChange, handleClick}) => {
    const title = "CHATTING";

    return (
        <Wrapper>
            <Header>
                <TitleBox>
                    <Avatar onClick={() => handleClick(`/user/${myId}`)}><img src={avatar} alt={""}/></Avatar>
                    <Title>{title}</Title>
                    <Link onClick={() => handleClick(`/addFriend`)}><AddIcon/></Link>
                </TitleBox>
                <Input placeholder={"Search User"} value={term} onChange={handleChange}/>
            </Header>
            <Body>
                {friends.map(({id, username, nickname, bio, avatar}) =>
                    <Friend key={id} onClick={() => handleClick(`/user/${id}`)}>
                        <Avatar><img src={avatar} alt={""}/></Avatar>
                        <Username>{nickname ? nickname : username}</Username>
                        <Bio>{bio}</Bio>
                    </Friend>
                )}
            </Body>
            <Footer>
                <Link onclick={() => handleClick("/")}><PeopleIcon/></Link>
                <Link onClick={() => handleClick("/rooms")}><ChatBubbleIcon/></Link>
            </Footer>
        </Wrapper>
    )
};

export default FriendsPresenter;
