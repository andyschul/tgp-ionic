import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { resolvers } from './resolvers';

import { ApolloProvider } from '@apollo/react-hooks'
import {
  ApolloClient,
  InMemoryCache,
  from,
} from "apollo-client-preset";
import { HttpLink } from 'apollo-link-http';
import { setContext } from "apollo-link-context";
import AWSAppSyncClient, {AUTH_TYPE} from "aws-appsync";
import awsconfig from './aws-exports';
import { Auth } from 'aws-amplify';
import { Rehydrated } from 'aws-appsync-react'
// const httpLink = new HttpLink({
//   uri: 'http://localhost:4000/graphql'
// })

// const authMiddleware = setContext(async (req, { headers }) => {
//   const session = await Auth.currentSession();
//   return {
//     headers: {
//       Authorization: session.idToken.jwtToken
//     },
//   };
// });

// const client = new ApolloClient({
//   link: from([authMiddleware, httpLink]),
//   cache: new InMemoryCache(),
//   resolvers,
// });


const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});

const WithProvider = () => (
    <ApolloProvider client={client}>
      <Rehydrated>
        <App />
      </Rehydrated>
    </ApolloProvider>
  )
  
  export default WithProvider