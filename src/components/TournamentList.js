import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_SCHEDULE = gql`
  {
    schedule {
      name
      id
    }
  }
`;

export default function TournamentList() {
    const { loading, error, data } = useQuery(GET_SCHEDULE);
    if (loading) return '';
    if (error) return `Error! ${error.message}`;
    return (
        <IonList>
            {data.schedule.map((tournament, index) => (
                <IonItem button key={tournament.id}>
                    <IonLabel>{tournament.name}</IonLabel>
                </IonItem>
            ))}
        </IonList>
    )
}