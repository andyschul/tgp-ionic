import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_SCHEDULE = gql`
  query GetSchedule($year: String) {
    schedule(year: $year) {
        id
        name
    }
  }
`;

const TournamentList = (props) => {
    const { data, loading, error } = useQuery(
      GET_SCHEDULE,
      { variables: { year: props.year } }
    );
    if (loading) return '';
    if (error) return `Error! ${error.message}`;
    return (
        <IonList>
            {data.schedule.map((tournament, index) => (
                <IonItem button key={tournament.id} routerLink={`/groups/${props.groupId}/tournaments/${tournament.id}`}>
                    <IonLabel>{tournament.name}</IonLabel>
                </IonItem>
            ))}
        </IonList>
    )
}

export default TournamentList;