import React, {useState} from "react";
import styled from "styled-components";
import {FormControl, TextField, Button} from "@material-ui/core";
import {toast} from "react-toastify";
import {gql} from "apollo-boost";
import {useMutation} from "react-apollo-hooks";

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  margin-bottom: 5px;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
      margin-bottom: 5px;
    }
  }
`;

// GraphQL Queries
const CONFIRM_USER = gql`
    mutation confirmUser($username: String!, $password: String!) {
        confirmUser(
            username:$username,
            password:$password
        )
    }
`;

const LOG_USER_IN = gql`
    mutation logUserIn($token: String!) {
        logUserIn(token: $token) @client
    }
`;

const CREATE_USER = gql`
    mutation  createUser($username: String!, $password: String!, $nickname: String) {
        createUser(username:$username, password:$password, nickname:$nickname) {
            id
        }
    }
`;

const Login = () => {
    const [action, setAction] = useState("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const confirmUser = useMutation(CONFIRM_USER, {variables: {username, password}})[0];
    const logUserIn = useMutation(LOG_USER_IN)[0];
    const createUser = useMutation(CREATE_USER, {variables: {username, password, nickname}})[0];

    const handleLogin = async (e) => {
        e.preventDefault();
        // Check id or password is empty
        if (!username || !password) {
            toast.error("You must fill out every field");
            setUsername("");
            setPassword("");
            return;
        }
        try {
            const {data: {confirmUser: token}} = await confirmUser();
            await logUserIn({variables: {token}});
        } catch (e) {
            setUsername("");
            setPassword("");
            toast.error("Wrong USERNAME / PASSWORD");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error("You must fill out USERNAME / PASSWORD");
            setUsername("");
            setPassword("");
            setNickname("");
            return;
        }
        try {
            await createUser();
            toast.success("Account is created");
            setAction("login");
        } catch (e) {
            setUsername("");
            setPassword("");
            setNickname("");
            console.error(e);
        }
    };

    return (
        <Container>
            <FormContainer>
                {action === "login" && (
                    <form noValidate autoComplete="off" onSubmit={handleLogin}>
                        <FormControl>
                            <TextField
                                label="USERNAME"
                                variant="outlined"
                                value={username}
                                autoComplete={"off"}
                                required={true}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                label="PASSWORD"
                                type="password"
                                variant="outlined"
                                value={password}
                                autoComplete={"off"}
                                required={true}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button type={"submit"} variant="contained" color="primary">Log In</Button>
                    </form>
                )}
                {action === "signup" && (
                    <form noValidate autoComplete="off" onSubmit={handleSignup}>
                        <FormControl>
                            <TextField
                                label="USERNAME"
                                variant="outlined"
                                value={username}
                                required={true}
                                autoComplete={"off"}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                label="PASSWORD"
                                type="password"
                                variant="outlined"
                                value={password}
                                required={true}
                                autoComplete={"off"}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                label="NICKNAME"
                                variant="outlined"
                                value={nickname}
                                autoComplete={"off"}
                                onChange={e => setNickname(e.target.value)}
                            />
                        </FormControl>
                        <Button type={"submit"} variant="contained" color="primary">Sign Up</Button>
                    </form>
                )}
            </FormContainer>
            {action === "login" && (
                < Button onClick={() => setAction("signup")}>Sign Up</Button>
            )}
            {action === "signup" && (
                < Button onClick={() => setAction("login")}>Log In</Button>
            )}
        </Container>
    );
};

export default Login;
