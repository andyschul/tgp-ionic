import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-client-preset'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
  })
  
  const middlewareAuthLink = new ApolloLink((operation, forward) => {
    const lastAuthUser = localStorage.getItem('CognitoIdentityServiceProvider.4kllfac0ensrledet05qbs2dme.LastAuthUser');
    const token = localStorage.getItem(`CognitoIdentityServiceProvider.4kllfac0ensrledet05qbs2dme.${lastAuthUser}.idToken`)
    const authorizationHeader = token
    operation.setContext({
      headers: {
        authorization: authorizationHeader
      }
    })
    return forward(operation)
  })
  
  const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)
  
  const client = new ApolloClient({
    link: httpLinkWithAuthToken,
    cache: new InMemoryCache()
  });

ReactDOM.render(
<ApolloProvider client={client}>
<App />
</ApolloProvider>, document.getElementById('root'));
