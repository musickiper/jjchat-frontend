import ApolloClient from "apollo-client";
import {withClientState} from "apollo-link-state";
import {ApolloLink, split} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {defaults, resolvers} from "./LocalState";
import {InMemoryCache} from "apollo-cache-inmemory";
import {setContext} from "apollo-link-context";

const cache = new InMemoryCache();

const stateLink = withClientState({
    cache,
    resolvers,
    defaults
});

const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            authorization: `Bearer ${localStorage.getItem("jjchat-token")}`
        }
    }
});

// Create an http link:
const httpLink = new HttpLink({
    uri: process.env.HTTP_LINK
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: process.env.WS_LINK,
    options: {
        reconnect: true
    }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export default new ApolloClient({
    link: ApolloLink.from([authLink.concat(stateLink), link]),
    cache
});
