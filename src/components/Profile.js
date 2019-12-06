import React, {useState, useEffect} from 'react';
import { IonPage, IonInput, IonButton, IonContent } from '@ionic/react';
import AppHeader from './AppHeader'
import { API, graphqlOperation } from 'aws-amplify'
import {updateUser as UPDATE_USER} from '../graphql/mutations'
import {getUser as GET_USER} from '../graphql/queries'

const Profile = () => {
  const [user, updateUser] = useState({})
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await API.graphql(graphqlOperation(UPDATE_USER, {input: {firstName: user.firstName, lastName: user.lastName}}))
    } catch (err) {
      console.log('error: ', err)
    }
  }

  function handleFirstChange(e) {
    updateUser({...user, firstName: e.target.value})
  }

  function handleLastChange(e) {
    updateUser({...user, lastName: e.target.value})
  }

  return (
    <IonPage>
      <AppHeader />
      <IonContent className="ion-padding">
        <form
          onSubmit={handleSubmit}
        >
          <IonInput placeholder="First Name" value={user.firstName} onInput={handleFirstChange}></IonInput>
          <IonInput placeholder="Last Name" value={user.lastName} onInput={handleLastChange}></IonInput>
          <IonButton type="submit">Save</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default Profile;