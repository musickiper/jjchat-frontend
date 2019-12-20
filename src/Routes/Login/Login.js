import React, { useState } from "react";
import styled from "styled-components";
import { FormControl, TextField, ButtonGroup, Button } from "@material-ui/core";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
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

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <FormContainer>
        <form noValidate autoComplete="off">
          <FormControl>
            <TextField
              id="outlined-helperText"
              label="ID"
              variant="outlined"
              value={id}
              onChange={e => setId(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button>Log In</Button>
            <Button>Sign Up</Button>
          </ButtonGroup>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Login;
