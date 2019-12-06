import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from '@apollo/react-hooks'
import AWSAppSyncClient, {AUTH_TYPE} from "aws-appsync";
import awsconfig from './aws-exports';
import { Auth } from 'aws-amplify';

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});

ReactDOM.render(
<ApolloProvider client={client}>
<App />
</ApolloProvider>, document.getElementById('root'));
