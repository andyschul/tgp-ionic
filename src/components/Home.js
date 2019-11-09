import { IonContent, IonPage, IonButton } from '@ionic/react';
import React from 'react';
import { Auth } from 'aws-amplify';
import AppHeader from './AppHeader'
import GroupList from './GroupList'



const Home = () => {
  function signOut() {
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }
  return (
    <IonPage>
      <AppHeader />
      <IonContent className="ion-padding">
        The world is your oyster!
        <p>
          If you get lost, the{' '}
          <button onClick={signOut}>Sign out</button>{' '}
          will be your guide.
        </p>
        <IonButton routerLink="/groups">Create Group</IonButton>
        <GroupList/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
