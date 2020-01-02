import React, {useState} from "react";
import styled from "styled-components";
import {toast} from "react-toastify";
import {gql} from "apollo-boost";
import {useMutation} from "react-apollo-hooks";
import {Helmet} from "react-helmet";

// Styled Components
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor:${props => props.isLoading ? "wait" : "default"};
`;

const FormContainer = styled.div`
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  height: ${props => props.theme.inputHeight};
  width: 30vh;
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: 1rem;
  padding-left: 1rem;
`;

const Button = styled.button`
  width: 10vh;
  height: ${props => props.theme.buttonHeight};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.blueColor};
  color: white;
  &:active {
    background-color: ${props => props.theme.greyColor};
  }
`;

const Link = styled.div`
  margin-top: 2vh;
  font-size: 0.7rem;
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
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);
            await logUserIn({variables: {token}});
            setIsLoading(false);
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
        <Wrapper isLoading={isLoading}>
            <Helmet>
                <meta charSet={"utf-8"}/>
                <title>Auth</title>
            </Helmet>
            <FormContainer>
                {action === "login" && (
                    <Form onSubmit={handleLogin}>
                        <Input value={username} placeholder={"USERNAME"} onChange={e => setUsername(e.target.value)}/>
                        <Input type="password" value={password} placeholder={"PASSWORD"}
                               onChange={e => setPassword(e.target.value)}/>
                        <Button type={"submit"}>Log In</Button>
                    </Form>
                )}
                {action === "signup" && (
                    <Form onSubmit={handleSignup}>
                        <Input value={username} placeholder={"USERNAME"} onChange={e => setUsername(e.target.value)}/>
                        <Input type="password" placeholder={"PASSWORD"} value={password}
                               onChange={e => setPassword(e.target.value)}/>
                        <Input value={nickname} placeholder={"NICKNAME"} onChange={e => setNickname(e.target.value)}/>
                        <Button type={"submit"}>Sign Up</Button>
                    </Form>
                )}
            </FormContainer>
            {action === "login" && (
                <Link onClick={() => setAction("signup")}>Sign Up</Link>
            )}
            {action === "signup" && (
                <Link onClick={() => setAction("login")}>Log In</Link>
            )}
        </Wrapper>
    );
};

export default Login;
