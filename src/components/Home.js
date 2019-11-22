import { IonContent, IonPage, IonButton } from '@ionic/react';
import React from 'react';
import AppHeader from './AppHeader'
import GroupList from './GroupList'



const Home = () => {
  return (
    <IonPage>
      <AppHeader />
      <IonContent className="ion-padding">
        The world is your oyster!
        <p>
          If you get lost, the{' '}
          {' '}
          will be your guide.
        </p>
        <IonButton routerLink="/groups">Create Group</IonButton>
        <GroupList/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
