import React, {useState} from 'react';
import styled from 'styled-components';
import {gql} from "apollo-boost";
import {useMutation, useQuery} from "react-apollo-hooks";
import storage from "../../Firebase/index";
import {toast} from "react-toastify";
import {Loading} from "../../components/Icons";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:100px;
  height: 100px;
  background-color: ${props => props.theme.greyColor};
  border-radius: 50%;
  margin-bottom: 20px;
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
  margin-bottom: 20px;
`;

const Input = styled.input`
  height: 30px;
  width: 150px;
  border-radius: 3px;
  padding: 1rem;
  margin-bottom: 20px;
`;

const Button = styled.button`
  height: 30px;
  width: 150px;
  color: white;
  margin-bottom: 20px;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.blueColor};
`;

const ME_AND_USER_BY_ID = gql`
    query userById($userId: String!) {
        userById(userId: $userId) {
            id
            username
            nickname
            bio
            avatar
        }
        me {
            id
        }
    }
`;

const UPDATE_USER = gql`
    mutation updateUser($nickname:String, $bio:String, $avatar:String) {
        updateUser(nickname:$nickname,bio:$bio,avatar:$avatar) {
            id
        }
    }
`;

const LOG_USER_OUT = gql`
    mutation logUserOut {
        logUserOut @client
    }
`;

const Profile = ({match, history}) => {
    const {userId} = match.params;
    const {data, loading} = useQuery(ME_AND_USER_BY_ID, {variables: {userId: userId}});
    const [newNickname, setNewNickname] = useState(undefined);
    const [newBio, setNewBio] = useState(undefined);
    const [image, setImage] = useState(Object);
    const [newAvatar, setNewAvatar] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const updateUser = useMutation(UPDATE_USER, {
        variables: {
            nickname: newNickname,
            bio: newBio,
            avatar: newAvatar
        }
    })[0];
    const logUserOut = useMutation(LOG_USER_OUT)[0];

    const handleAvatarChoose = async (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        try {
                const curTime = Date.now();
                const imageName = `${curTime}_${image.name}`;
                setIsLoading(true);
                await storage.ref(`images/${imageName}`).put(image);
                const url = await storage.ref(`images/${imageName}`).getDownloadURL();
                setNewAvatar(url);
                setIsLoading(false);
        } catch (e) {
            console.error(e);
            toast.error("Upload Image failed");
            return;
        }
        toast.success("Upload Image success");
    };

    const handleUpdateProfile = async () => {
        try {
            await updateUser();
            toast.success("Profile succeesfully updated");
            history.push("/");
            window.location.reload();
        } catch(e) {
           toast.error("Profile update failed");
        }
    };

    const handleSendMessage = (userId) => {
        history.push(`/sendMessage/${userId}`);
    };

    if (!loading) {
        const {id: userId, username, nickname, bio, avatar} = data.userById;
        const {id: meId} = data.me;
        return (
            <Wrapper>
                {isLoading && <Loading/>}
                <label htmlFor={"file-upload"}><Avatar><img src={avatar} alt={""}/></Avatar></label>
                <Input type={"file"} id={"file-upload"} onChange={handleAvatarChoose} hidden/>
                <TextBox>@ {username}</TextBox>
                <Input type={"text"} value={newNickname} placeholder={nickname}
                       onChange={(e) => setNewNickname(e.target.value)}/>
                <Input type={"text"} value={newBio} placeholder={bio} onChange={(e) => setNewBio(e.target.value)}/>
                {userId === meId &&
                (
                    <>
                        <Button onClick={handleImageUpload}>Upload Image</Button>
                        <Button onClick={handleUpdateProfile}>Update Profile</Button>
                        <Button onClick={() => logUserOut()}>Log Out</Button>
                    </>
                )}
                {userId !== meId &&
                (
                    <Button onClick={() => handleSendMessage(userId)}>Send Message</Button>
                )}
            </Wrapper>
        );
    } else {
        return (
            <div>Loading...</div>
        )
    }
};

export default Profile;
