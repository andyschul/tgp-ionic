import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './components/Home';
import Profile from './components/Profile'
import CreateGroup from './components/CreateGroup'
import Group from './components/Group'
import JoinGroup from './components/JoinGroup'
import Tournament from './components/Tournament'
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

Amplify.configure(awsconfig);

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact={true} path="/home" component={Home} />
        <Route exact={true} path="/" render={() => <Redirect to="/home" />} />
        <Route exact={true} path="/profile" component={Profile} />
        <Route exact={true} path="/groups" component={CreateGroup} />
        <Route exact={true} path="/groups/:id/:year" component={Group} />
        <Route exact={true} path="/groups/:groupId/tournaments/:tournamentId" component={Tournament} />
        <Route path="/groups/:id/join" component={JoinGroup} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);


const signUpConfig = {
  header: 'Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'First name',
      key: 'given_name',
      required: true,
      displayOrder: 2,
      type: 'string'
    },
    {
      label: 'Last name',
      key: 'family_name',
      required: true,
      displayOrder: 3,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 4,
      type: 'password'
    }
  ]
};
const usernameAttributes = 'email';

export default withAuthenticator(App, {
  signUpConfig,
  usernameAttributes
});


