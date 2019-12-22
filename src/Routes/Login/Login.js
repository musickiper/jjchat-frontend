import React, {useState} from "react";
import styled from "styled-components";
import {FormControl, TextField, ButtonGroup, Button} from "@material-ui/core";
import {toast} from "react-toastify";
import {gql} from "apollo-boost";
import {useMutation, useQuery} from "react-apollo-hooks";

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

const Login = ({history}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const confirmUser = useMutation(CONFIRM_USER, {variables:{username,password}})[0];
    const logUserIn = useMutation(LOG_USER_IN)[0];

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
            const {data:{confirmUser:token}} = await confirmUser();
            await logUserIn({variables:{token}});
        } catch (e) {
            setUsername("");
            setPassword("");
            console.error(e);
        }
    };

    const handleSignup = () => {
        history.push("/signup");
    };

    return (
        <Container>
            <FormContainer>
                <form noValidate autoComplete="off" onSubmit={handleLogin}>
                    <FormControl>
                        <TextField
                            id="outlined-helperText"
                            label="USERNAME"
                            variant="outlined"
                            value={username}
                            required={true}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            value={password}
                            required={true}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button type={"submit"} variant="contained" color="primary">Log In</Button>
                </form>
            </FormContainer>
            <Button onClick={handleSignup}>Sign Up</Button>
        </Container>
    );
};

export default Login;
