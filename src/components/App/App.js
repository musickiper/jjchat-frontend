import React from "react";
import "./App.css";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import AppRouter from "../Router";

const Wrapper = styled.div``;

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

function App() {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  console.log(isLoggedIn);

  return (
    <Wrapper>
      <AppRouter isLoggedIn={isLoggedIn} />
    </Wrapper>
  );
}

export default App;
