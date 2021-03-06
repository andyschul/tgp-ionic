import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { IonList, IonButton, IonContent } from '@ionic/react';
import gql from 'graphql-tag';

const GET_GROUPS = gql`
  {
    user {
      groups {
        id
        groupName
        role
        teamName
      }
    }
  }
`;


const GroupList = () => {
    const { loading, error, data } = useQuery(GET_GROUPS);
    if (loading) return (
        <div>Loading</div>
    );
    if (error) return (
        <div>`Error! ${error.message}`</div>
    );
    return (
        <IonContent>
        <IonList>
            {data.user.groups.map((group) => (
              <IonButton key={group.id} routerLink={`/groups/${group.id}/${new Date().getFullYear()}`}>{group.groupName}</IonButton>
            ))}
    </IonList>
  </IonContent>
    )
}

export default GroupList;