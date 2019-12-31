import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 50vh;
  height: 80vh;
  border: 1px solid ${props => props.theme.greyColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15vh;
  height: 15vh;
  background-color: ${props => props.theme.greyColor};
  border-radius: 50%;
  margin-bottom: 2vh;
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

const TextBox = styled.div`
  color: ${props => props.theme.greyColor};
  margin-bottom: 2vh;
`;

const Input = styled.input`
  height: ${props => props.theme.inputHeight};
  width: 50%;
  padding: 2vh;
  margin-bottom: 2vh;
`;

const Button = styled.button`
  height: 5vh;
  width: 50%;
  color: white;
  margin-bottom: 2vh;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.blueColor};
`;

const ProfilePresenter = ({
                              userId,
                              username,
                              avatar,
                              nickname,
                              bio,
                              meId,
                              newNickname,
                              setNewNickname,
                              newBio,
                              setNewBio,
                              newImg,
                              handleChooseImg,
                              handleImgUpload,
                              handleUpdateProfile,
                              logUserOut,
                              handleClick
                          }) => {
    return (
        <Wrapper>
            <label htmlFor={"file-upload"}><Avatar><img src={avatar} alt={""}/></Avatar></label>
            <Input type={"file"} id={"file-upload"} onChange={handleChooseImg} hidden/>
            <TextBox>@ {username}</TextBox>
            <Input type={"text"} value={newNickname} placeholder={nickname}
                   onChange={(e) => setNewNickname(e.target.value)}/>
            <Input type={"text"} value={newBio} placeholder={bio} onChange={(e) => setNewBio(e.target.value)}/>
            {userId === meId &&
            (
                <>
                    {newImg && <Button onClick={handleImgUpload}>Upload Image</Button>}
                    {!newImg && <Button onClick={handleUpdateProfile}>Update Profile</Button>}
                    <Button onClick={logUserOut}>Log Out</Button>
                </>
            )}
            {userId !== meId &&
            (
                <Button onClick={handleClick}>Create Room</Button>
            )}
        </Wrapper>
    );
};

export default ProfilePresenter;
