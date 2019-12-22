import {createGlobalStyle} from "styled-components";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }
  input {
    border: none;
    background-color: ${props => props.theme.lightGreyColor};
  }
  input:focus {
    outline: none;
  }
  button {
    border: none;
  }
  button:focus {
    outline: none;
  }
`;
