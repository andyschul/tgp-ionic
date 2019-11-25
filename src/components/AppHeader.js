import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Auth } from 'aws-amplify';

const GET_USER = gql`
  {
    user {
      email
      firstName
      lastName
    }
  }
`;

const AppHeader = () => {
    const { client, loading, error, data } = useQuery(GET_USER);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    async function signOut() {
      Auth.signOut()
    }

    return (
        <IonHeader>
            <IonToolbar>
            <IonTitle>
                <IonButton routerLink="/">Home</IonButton>{data.user.email}<IonButton routerLink="/profile">Profile</IonButton>
                <IonButton onClick={() => {
                  signOut().then(() => client.resetStore());
                }}>Sign out</IonButton>
            </IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default AppHeader;

