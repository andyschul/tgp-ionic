import React, {useEffect, useState} from 'react';
import { IonHeader, IonContent, IonPopover, IonToolbar, IonTitle, IonButton, IonIcon, IonButtons, IonList, IonItem, IonLabel } from '@ionic/react';
import { API, graphqlOperation } from 'aws-amplify'
import { Auth } from 'aws-amplify';
import {getUser as GET_USER} from '../graphql/queries'

const AppHeader = () => {
  const [user, updateUser] = useState({})
  const [showPopover, setShowPopover] = useState(false);

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
          <IonButton fill="clear" color="dark" onClick={() => setShowPopover(true)}>
            Groups <IonIcon name="ios-arrow-down" />
          </IonButton>

          <IonPopover
            mode="ios"
            isOpen={showPopover}
            onDidDismiss={e => setShowPopover(false)}
          >
            <IonContent>
            <IonList>
              <IonItem>
                <IonButton routerLink="/home">Home</IonButton>
              </IonItem>
              {user.groups && user.groups.map(g => 
              <IonItem key={g.id}>
                <IonButton routerLink={`/groups/${g.id}/2019`}>{g.groupName}</IonButton>
              </IonItem>
              )}
            </IonList>
            </IonContent>
          </IonPopover>


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
