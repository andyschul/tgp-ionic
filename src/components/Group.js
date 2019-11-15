import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import TournamentList from './TournamentList'
import InviteList from './InviteList'
import AppHeader from './AppHeader'

const GET_GROUP_DETAILS = gql`
  query GroupDetails($groupId: ID!) {
    group(id: $groupId) {
        id
        groupName
        invites
        users {
            firstName
            lastName
            role
        }
    }
  }
`;

export default function Group(route) {
    const { data, loading, error } = useQuery(
        GET_GROUP_DETAILS,
        { variables: { groupId: route.match.params.id } }
    );
    if (loading) return '';
    if (error) return `Error! ${error.message}`;
    return (
        <IonPage>
            <AppHeader />
            <IonContent className="ion-padding">
            <div>Group Name:</div>
            <div>{data.group.groupName}</div>

            <div>Invites:</div>
            {data.group.invites.map((email, idx) => (
                <React.Fragment key={idx}>
                <div>{email}</div>
                <button>remove</button>
                </React.Fragment>
            ))}

        <div>Users:</div>
            {data.group.users.map((user,idx) => (
                <div key={idx}>{user.firstName} {user.lastName}, {user.role}</div>
            ))}
            <TournamentList year={route.match.params.year} groupId={route.match.params.id} />
            <InviteList groupId={route.match.params.id} />
            </IonContent>
        </IonPage>
    )
}