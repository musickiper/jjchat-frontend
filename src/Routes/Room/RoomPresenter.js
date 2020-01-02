import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Helmet} from "react-helmet";

const Wrapper = styled.div`
  width: 50vh;
  height: 80vh;
  border: 1px solid ${props => props.theme.greyColor};
  padding-left: 1vh;
  padding-right: 1vh;
  background-color: ${props => props.theme.greyColor};
`;

const Header = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  margin-bottom: 1vh;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.lightGreyColor};
`;

const Title = styled.div``;

const Exit = styled.div`
  &:hover {
    cursor:pointer;
  }
`;

const Messages = styled.div`
  width: 100%;
  height: 60vh;
  overflow: scroll;
`;

const MessageByMe = styled.div`
  width: 100%;
  height: 8vh;
  border: 1px solid ${props => props.theme.lightGreyColor};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1vh;
`;

const MessageByOthers = styled.div`
  width: 100%;
  height: 8vh;
  border: 1px solid ${props => props.theme.lightGreyColor};
  display: flex;
  align-items: center;
  margin-bottom: 1vh;
`;

const Avatar = styled.div`
  height: 7vh;
  width: 7vh;
  background-color: ${props => props.theme.greyColor};
  border-radius: 50%;
  margin-left: 1vh;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const Contents = styled.div`
  height: 7vh;
  min-width: 10vh;
  padding: 1vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const User = styled.div`
  font-size: 0.3rem;
  color: ${props => props.theme.lightGreyColor};
`;

const Text = styled.div`
  margin-top: 0.5vh;
  padding: 0.3rem;
  font-size: 0.7rem;
  color: ${props => props.theme.greyColor};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.lightGreyColor};
`;

const CreatedAt = styled.div`
  font-size: 0.3rem;
  color: ${props => props.theme.lightGreyColor};
  height: 7vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div`
  width: 100%;
  height: 10vh;
  border-top: 1px solid ${props => props.theme.lightGreyColor};
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 90%;
    height: 60%;
    border-radius: 30px;
    padding: 1rem;
  }
`;

const RoomPresenter = ({myId, parseTitle, parseTime, participants, messages, message, setMessage, handleSubmit, handleClick}) => {
    const messagesRef = useRef(null);

    // Scroll to bottom whenever new message sent
    useEffect(() => {
        const {scrollHeight, clientHeight} = messagesRef.current;
        messagesRef.current.scrollTop = scrollHeight - clientHeight;
    }, [messages]);

    return (
        <Wrapper>
            <Helmet>
                <meta charSet={"utf-8"}/>
                <title>Room</title>
            </Helmet>
            <Header>
                <Title>{parseTitle(myId, participants)}</Title>
                <Exit onClick={handleClick}><ExitToAppIcon/></Exit>
            </Header>
            <Messages ref={messagesRef}>
                {messages.map(({id, text, createdAt, user}) => {
                    const parsedDate = parseTime(createdAt);
                    if (user.id === myId) {
                        return (
                            <MessageByMe key={id}>
                                <CreatedAt>
                                    <div>{`${parsedDate[0]}/${parsedDate[1]}`}</div>
                                    <div>{`${parsedDate[2]}:${parsedDate[3]}`}</div>
                                </CreatedAt>
                                <Contents>
                                    <Text>{text}</Text>
                                </Contents>
                            </MessageByMe>
                        );
                    } else {
                        return (
                            <MessageByOthers key={id}>
                                <Avatar>
                                    <img src={user.avatar} alt={""}/>
                                </Avatar>
                                <Contents>
                                    <User>{user.nickname}</User>
                                    <Text>{text}</Text>
                                </Contents>
                                <CreatedAt>
                                    <div>{`${parsedDate[0]}/${parsedDate[1]}`}</div>
                                    <div>{`${parsedDate[2]}:${parsedDate[3]}`}</div>
                                </CreatedAt>
                            </MessageByOthers>
                        );
                    }
                })}
            </Messages>
            <InputBox>
                <input value={message} onChange={e => setMessage(e.target.value)} onKeyPress={handleSubmit}/>
            </InputBox>
        </Wrapper>
    )
};

export default RoomPresenter;
