import {createGlobalStyle} from "styled-components";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:700&display=swap');
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
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
