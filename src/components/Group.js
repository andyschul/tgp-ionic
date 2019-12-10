import React, {useState, useEffect} from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { API, graphqlOperation } from 'aws-amplify'
import TournamentList from './TournamentList'
import InviteList from './InviteList'
import AppHeader from './AppHeader'
import {getGroup as GET_GROUP} from '../graphql/queries'

export default function Group(route) {
    const [group, updateGroup] = useState({})

    useEffect(() => {
        async function fetchData() {
          try {
            const res = await API.graphql(graphqlOperation(GET_GROUP, {id: route.match.params.id}))
            updateGroup(res.data.getGroup)
          } catch (err) {
            console.log('error: ', err)
          }
        }
        fetchData();
      }, [route.match.params.id]);

    return (
        <IonPage>
            <AppHeader groupId={group.id} groupName={group.groupName} />
            <IonContent className="ion-padding">
            <div>Group Name:</div>
            <div>{group.groupName}</div>

            <div>Invites:</div>
            {group.invites && group.invites.map((email, idx) => (
                <React.Fragment key={idx}>
                <div>{email}</div>
                <button>remove</button>
                </React.Fragment>
            ))}

        <div>Users:</div>
            {group.users && group.users.map((user,idx) => (
                <div key={idx}>{user.firstName} {user.lastName}, {user.role}</div>
            ))}
            <TournamentList year={route.match.params.year} groupId={route.match.params.id} />
            {/* <TournamentList year={route.match.params.year} groupId={route.match.params.id} />
            <InviteList groupId={route.match.params.id} /> */}
            </IonContent>
        </IonPage>
    )
}