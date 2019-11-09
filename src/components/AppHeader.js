import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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
    const { loading, error, data } = useQuery(GET_USER);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <IonHeader>
            <IonToolbar>
            <IonTitle>
                <IonButton routerLink="/">Home</IonButton>{data.user.email}<IonButton routerLink="/profile">Profile</IonButton>
            </IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default AppHeader;

