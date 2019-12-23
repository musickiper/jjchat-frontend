import React from 'react';
import styled from 'styled-components';
import {AddUser, WriteMessage} from "./Icons";
import {gql} from "apollo-boost";
import {useQuery} from "react-apollo-hooks";
import {withRouter} from 'react-router-dom';

const Wrapper = styled.div`
  height:50px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  display:flex;
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
  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Right = styled.div`
  display:flex;
  div:first-child {
    margin-right: 0.5rem;
  }
`;

const Link = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:40px;
  height:40px;
  background-color: ${props => props.theme.lightGreyColor};
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
`;

const ME = gql`
    query me {
        me {
            id
            avatar
        }
    }
`;

const Header = ({title, history}) => {
    const {data , loading} = useQuery(ME);
    const onClickAvatar = (id) => {
        history.push(`/user/${id}`);
    };

    const onClickSendMsg = () => {
        history.push(`/newmsg`);
    };

    const onClickAddFriend = () => {
        history.push(`/addfriend`);
    };

    if(!loading) {
        const {id, avatar} = data.me;
        return (
            <Wrapper>
                <Left>
                    <Avatar onClick={()=>onClickAvatar(id)}><img src={avatar} alt={""}/></Avatar>
                    <Title>{title}</Title>
                </Left>
                <Right>
                    <Link onClick={onClickSendMsg}><WriteMessage/></Link>
                    <Link onClick={onClickAddFriend}><AddUser/></Link>
                </Right>
            </Wrapper>
        );
    } else {
        return (
            <Wrapper>Loading...</Wrapper>
        )
    }
};

export default withRouter(Header);
