import React from "react";
import {useQuery} from "react-apollo-hooks";
import {gql} from "apollo-boost";
import styled from "styled-components";
import {ThemeProvider} from "styled-components";
import AppRouter from "./Router";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Wrapper = styled.div``;

const QUERY = gql`
    {
        isLoggedIn @client
    }
`;

const App = () => {
    const {
        data: {isLoggedIn}
    } = useQuery(QUERY);

    return (
        <ThemeProvider theme={Theme}>
            <Wrapper>
                <GlobalStyles/>
                <AppRouter isLoggedIn={isLoggedIn}/>
                <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
            </Wrapper>
        </ThemeProvider>
    );
};

export default App;
