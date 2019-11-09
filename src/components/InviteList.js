import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { IonPage, IonContent, IonInput, IonButton } from '@ionic/react';
import AppHeader from './AppHeader'

const INVITE_TO_GROUP = gql`
  mutation inviteToGroup($groupId: ID!, $email: String) {
    inviteToGroup(groupId: $groupId, email: $email) {
      email
    }
  }
`;

const InviteList = (props) => {
    const [email, setEmail] = useState('');
    const [inviteToGroup] = useMutation(INVITE_TO_GROUP);

    function handleSubmit(e) {
        e.preventDefault();
        inviteToGroup({ variables: { groupId: props.groupId, email: email } });
      }

      function handleChange(e) {
        setEmail(e.target.value);
      }

    return (

                <form
                onSubmit={handleSubmit}
                >
                    <IonInput placeholder="Email" value={email} onInput={handleChange}></IonInput>
                    <IonButton type="submit">Save</IonButton>
                </form>

    )
}

export default InviteList;