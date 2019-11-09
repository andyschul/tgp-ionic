import React, { useState } from 'react';
import { IonContent, IonPage, IonButton, IonInput } from '@ionic/react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AppHeader from './AppHeader'

const GET_GROUP_DETAILS = gql`
  query GroupDetails($groupId: ID!) {
    group(id: $groupId) {
        id
        groupName
        invites
    }
    user {
        email
    }
  }
`;

const JOIN_GROUP = gql`
  mutation joinGroup($groupId: ID!, $name: String) {
    joinGroup(groupId: $groupId, name: $name) {
      msg
    }
  }
`;

export default function JoinGroup(route) {
    const [joinGroup] = useMutation(JOIN_GROUP);
    const { data, loading, error } = useQuery(
        GET_GROUP_DETAILS,
        { variables: { groupId: route.match.params.id } }
    );
    const [name, setName] = useState('');
    if (loading) return '';
    if (error) return `Error! ${error.message}`;


    function handleSubmit(e) {
      e.preventDefault();
      let resp = joinGroup({ variables: { groupId: data.group.id, name: name } });
      console.log(resp)
    }

    function handleChange(e) {
        setName(e.target.value)
    }

    return (
        <IonPage>
            <AppHeader />
            <IonContent className="ion-padding">
                <div>Join Group</div>
                <div>{data.group.groupName}</div>
                <div>{data.user.email}</div>
                {data.group.invites.includes(data.user.email) ?
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