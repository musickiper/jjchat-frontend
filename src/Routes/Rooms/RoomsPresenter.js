import React from 'react';
import styled from 'styled-components';
import PeopleIcon from "@material-ui/icons/People";
import AddIcon from '@material-ui/icons/Add';
import {Helmet} from "react-helmet";

const Wrapper = styled.div`
  width: 50vh;
  height: 80vh;
  border: 1px solid ${props => props.theme.greyColor};
  background-color: ${props => props.theme.greyColor};
  padding-left: 1vh;
  padding-right: 1vh;
`;

const Body = styled.div`
  width: 100%;
  height: 68vh;
  overflow: scroll;
  padding: 1vh;
`;

const Room = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px dotted ${props => props.theme.lightGreyColor};
  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
`;

const Avatar = styled.div`
  width:8vh;
  height:8vh;
  border-radius: 25%;
  ${props => props.partition >= 2 && "grid-template-columns: 1fr 1fr"};
  ${props => props.partition >= 3 && "grid-template-rows: 1fr 1fr"};
  img {
    width: 100%;
    height: 100%;
    margin: 0;
    ${props => props.partition >= 2 && "width: 50%"};
    ${props => props.partition >= 3 && "height: 50%"};
    border-radius: 25%;
    border: 1px solid ${props => props.theme.greyColor};
  }
  img:nth-child(n+5) {
    display:none;
  }
`;

const Preview = styled.div`
  width: 25vh;
  height: 8vh;
  display: flex;
  flex-direction: column;
`;

const Users = styled.div`
  width: 25vh;
  height: 4vh;
  display: flex;
  color: ${props => props.theme.lightGreyColor};
  font-size: 0.7rem;
  align-items: center;
`;

const Text = styled.div`
  font-size: 0.5rem;
  display: flex;
  align-items: center;
`;

const CreatedAt = styled.div`
  font-size: 0.5rem;
  color:${props => props.theme.lightGreyColor};
`;

const Footer = styled.div`
  width: 100%;
  height: 12vh;
  border-top: 1px solid ${props => props.theme.greyColor};
  display: flex;
  align-items: center;
  justify-content: space-around;
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

const RoomsPresenter = ({rooms, parseDate, handleClick}) => {
    return (
        <Wrapper>
            <Helmet>
                <meta charSet={"utf-8"}/>
                <title>Rooms</title>
            </Helmet>
            <Body>
                {rooms.map(room => {
                    const {id, participants, messages, createdAt} = room;
                    return (
                        <Room key={id} onClick={() => handleClick(`/room/${id}`)}>
                            <Avatar partition={participants.length}>{participants.map(
                                participant =>
                                    <img key={participant.id} src={participant.avatar} alt={""}/>
                            )}</Avatar>
                            <Preview>
                                <Users>{participants.map(participant => `${participant.nickname} | `)}</Users>
                                <Text>{messages[messages.length - 1].text}</Text>
                            </Preview>
                            <CreatedAt>{parseDate(createdAt)}</CreatedAt>
                        </Room>
                    );
                })}
            </Body>
            <Footer>
                <Link onClick={() => handleClick("/")}><PeopleIcon/></Link>
                <Link onClick={() => handleClick("/createRoom")}><AddIcon/></Link>
            </Footer>
        </Wrapper>
    )
};

export default RoomsPresenter;
