import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloProvider } from '@apollo/react-hooks'
import {
  ApolloClient,
  InMemoryCache,
  from,
} from "apollo-client-preset";
import { HttpLink } from 'apollo-link-http';
import { setContext } from "apollo-link-context";
import { Auth } from 'aws-amplify';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

const authMiddleware = setContext(async (req, { headers }) => {
  const session = await Auth.currentSession();
  return {
    headers: {
      Authorization: session.idToken.jwtToken
    },
  };
});

const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
<ApolloProvider client={client}>
<App />
</ApolloProvider>, document.getElementById('root'));
