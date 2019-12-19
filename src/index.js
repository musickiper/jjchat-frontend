import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { ApolloProvider } from "react-apollo-hooks";
import { BrowserRouter } from "react-router-dom";
import Client from "./Apollo/Client";

ReactDOM.render(
  <ApolloProvider client={Client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
