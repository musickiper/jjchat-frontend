import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  input {
    border: none;
    background-color: ${props => props.theme.lightGreyColor};
  }
  button {
    border: none;
  }
`;
