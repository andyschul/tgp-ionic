import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import {inviteToGroup as INVITE_TO_GROUP} from '../graphql/mutations'
import { IonInput, IonButton } from '@ionic/react';


const InviteList = (props) => {
  const [email, setEmail] = useState('');

  async function handleSubmit(e) {
      e.preventDefault();
      const res = await API.graphql(graphqlOperation(INVITE_TO_GROUP, {input: {groupId: props.groupId, email: email}}))
      setEmail('')
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