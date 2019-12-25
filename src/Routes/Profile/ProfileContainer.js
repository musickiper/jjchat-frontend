import {gql} from "apollo-boost";
import React, {useState} from "react";
import {useMutation, useQuery} from "react-apollo-hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import {toast} from "react-toastify";
import {imageUpload} from "../../utils";
import ProfilePresenter from "./ProfilePresenter";

const USER_BY_ID_AND_ME = gql`
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
            username
            nickname
            bio
            avatar
        }
    }
`;

const LOG_USER_OUT = gql`
    mutation logUserOut {
        logUserOut @client
    }
`;

const ProfileContainer = ({match, history}) => {
    const {userId} = match.params;
    const [newNickname, setNewNickname] = useState("");
    const [newBio, setNewBio] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newAvatar, setNewAvatar] = useState("");

    // Queries
    // Get my info & user info from server
    const {data, loading} = useQuery(USER_BY_ID_AND_ME, {
        variables:
            {
                userId: userId
            }
    });

    // Update user info using new data
    const updateUser = useMutation(UPDATE_USER, {
        variables: {
            nickname: newNickname === "" ? undefined : newNickname,
            bio: newBio === "" ? undefined : newBio,
            avatar: newAvatar === "" ? undefined : newAvatar
        }
    })[0];

    // Logout
    const logUserOut = useMutation(LOG_USER_OUT)[0];

    // Functions
    // Choose an image file to use it as an avatar
    const handleChooseImg = async (e) => {
        const file = e.target.files[0];
        // Check file type
        if (file.type.split('/')[0] === 'image') {
            setNewImg(e.target.files[0]);
            toast.success("Image file is completely picked");
        } else {
            toast.error("You should choose an image file");
        }
    };

    // Upload image file to firebase storage, get an url to access
    const handleImgUpload = async () => {
        const url = await imageUpload(newImg);
        await setNewAvatar(url);
        await setNewImg("");
    };

    // Update user profile using new data
    const handleUpdateProfile = async () => {
        try {
            await updateUser();
            toast.success("Profile completely updated");
            history.push("/");
            window.location.reload();
        } catch (e) {
            toast.error("ProfilePresenter update failed");
        }
    };

    // Logout
    const logoutUser = () => logUserOut();

    // Push to specific link
    const handleClick = (link) => {
        history.push(link);
    };

    if (!loading && data.me && data.userById) {
        const {id: userId, username, nickname, bio, avatar} = data.userById;
        const {id: meId} = data.me;

        return (
            <ProfilePresenter
                userId={userId}
                username={username}
                avatar={avatar}
                nickname={nickname}
                bio={bio}
                meId={meId}
                newNickname={newNickname}
                setNewNickname={setNewNickname}
                newBio={newBio}
                setNewBio={setNewBio}
                newImg={newImg}
                handleChooseImg={handleChooseImg}
                handleImgUpload={handleImgUpload}
                handleUpdateProfile={handleUpdateProfile}
                logUserOut={logoutUser}
                handleClick={handleClick}
            />
        );
    } else {
        return <CircularProgress color="secondary"/>;
    }
};

export default ProfileContainer;
