import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonInput } from '@ionic/react';
import { API, graphqlOperation } from 'aws-amplify'
import {getGroup as GET_GROUP, getUser as GET_USER} from '../graphql/queries'
import {joinGroup as JOIN_GROUP} from '../graphql/mutations'
import AppHeader from './AppHeader'

export default function JoinGroup(route) {
    const [user, updateUser] = useState({})
    const [group, updateGroup] = useState({users:[], invites:[]})
    const [name, setName] = useState('');


    useEffect(() => {
      async function fetchData() {
        try {
          const groupRes = await API.graphql(graphqlOperation(GET_GROUP, {id: route.match.params.id}))
          updateGroup(groupRes.data.getGroup)
          const userRes = await API.graphql(graphqlOperation(GET_USER))
          updateUser(userRes.data.getUser)
        } catch (err) {
          console.log('error: ', err)
        }
      }
      fetchData();
    }, [route.match.params.id]);


    async function handleSubmit(e) {
      e.preventDefault();
      await API.graphql(graphqlOperation(JOIN_GROUP, {input: {groupId: group.id, name: name}}))
    }

    function handleChange(e) {
        setName(e.target.value)
    }

    return (
        <IonPage>
            <AppHeader />
            <IonContent className="ion-padding">
                <div>Join Group</div>
                <div>{group.groupName}</div>
                <div>{user.email}</div>
                {group.invites.includes(user.email) ?
                    <form
                    onSubmit={handleSubmit}
                    >
                        <IonInput placeholder="Group Name" value={name} onInput={handleChange}></IonInput>
                        <IonButton type="submit">Join Group</IonButton>{name}
                    </form>
                : 
                    'You were not invited to this group'
                }
            </IonContent>
        </IonPage>
    )
}