import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { IonPage, IonInput, IonButton, IonContent } from '@ionic/react';
import AppHeader from './AppHeader'

const CREATE_GROUP = gql`
  mutation createGroup($name: String) {
    createGroup(name: $name) {
      name
    }
  }
`;

const CreateGroup = () => {
    const [createGroup] = useMutation(CREATE_GROUP);
    const [name, setName] = useState('');

    function handleSubmit(e) {
      e.preventDefault();
      createGroup({ variables: { name: name } });
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
                    <IonButton type="submit">Save</IonButton>{name}
                </form>
            </IonContent>
        </IonPage>
    );
}

export default CreateGroup;