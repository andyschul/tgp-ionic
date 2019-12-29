import React, { useState } from 'react';
import {createGroup as CREATE_GROUP} from '../graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import { IonPage, IonInput, IonButton, IonContent } from '@ionic/react';
import AppHeader from './AppHeader'

const CreateGroup = () => {
    const [name, setName] = useState('');

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        let res = await API.graphql(graphqlOperation(CREATE_GROUP, {input: {name: name}}))
        console.log(res)
      } catch (err) {
        console.log('error: ', err)
      }
    }

    function handleChange(e) {
        setName(e.target.value)
    }

    return (
        <IonPage>
            <AppHeader />
            <IonContent className="ion-padding">
                <form
                onSubmit={handleSubmit}
                >
                    <IonInput placeholder="Group Name" value={name} onInput={handleChange}></IonInput>
                    <IonButton type="submit">Save</IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
}

export default CreateGroup;