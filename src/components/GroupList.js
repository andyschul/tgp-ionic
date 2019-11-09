import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { IonList, IonItem, IonButton, IonContent } from '@ionic/react';
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
        {/*-- List of Text Items --*/}
        <IonList>
            {data.user.groups.map((group) => (
              <IonButton key={group.id} routerLink={`/groups/${group.id}`}>{group.groupName}</IonButton>
            ))}
            <IonButton routerLink={`/groups`}>Create Group</IonButton>
    </IonList>
  </IonContent>
    )
}

export default GroupList;