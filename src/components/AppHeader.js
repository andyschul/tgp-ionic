import React, {useEffect, useState} from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonIcon, IonButtons } from '@ionic/react';
import { API, graphqlOperation } from 'aws-amplify'
import { Auth } from 'aws-amplify';
import {getUser as GET_USER} from '../graphql/queries'

const AppHeader = () => {
  const [user, updateUser] = useState({email: 'test'})
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.graphql(graphqlOperation(GET_USER))
        updateUser(res.data.getUser)
      } catch (err) {
        console.log('error: ', err)
      }
    }
    fetchData();
  }, []);

  async function signOut() {
    Auth.signOut()
  }

  return (
    <IonHeader>
      <IonToolbar mode="ios">
        <IonTitle>
          <IonButton fill="clear" color="dark">
            My Navigation Bar {user.email} <IonIcon name="ios-arrow-down" />
          </IonButton>
        </IonTitle>
        <IonButtons slot="primary">
          <IonButton routerLink="/profile">Profile</IonButton>
          <IonButton onClick={() => signOut()}>
            <IonIcon slot="icon-only" name="person" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}

export default AppHeader;
