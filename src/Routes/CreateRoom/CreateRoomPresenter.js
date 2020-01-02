import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  width: 50vh;
  height: 80vh;
  border: 1px solid ${props => props.theme.greyColor};
`;

const List = styled.div`
  width: 100%;
  height: 80%;
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
  ${({isClicked, theme}) => isClicked 
    ? `background-color: ${theme.greyColor}` : null}; 
  border-bottom: 1px dotted ${props => props.theme.greyColor};
  &:hover {
    cursor:pointer;
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

const Footer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  width: 20vh;
  height: 50%;
  color: white;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.blueColor};
  &:hover {
    opacity: 50%;
    cursor: pointer;
  }
`;

const CreateRoomPresenter = ({users, me, userIds, handleClick, handleSubmit}) => {
    return (
        <Wrapper>
            <List>
                {users.map(({id, username, nickname, avatar}) => id !== me.id &&
                    <Friend key={id} onClick={()=>handleClick(id)} isClicked={userIds.includes(id)}>
                        <Avatar><img src={avatar} alt={""}/></Avatar>
                        <Username>{nickname ? nickname : username}</Username>
                    </Friend>
                )}
            </List>
            <Footer>
                <Button onClick={handleSubmit}>Create Room</Button>
            </Footer>
        </Wrapper>
    );
};

export default CreateRoomPresenter;
