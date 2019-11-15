import React from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AppHeader from './AppHeader'
import PlayerList from './PlayerList'

const GET_TOURNAMENT = gql`
  query GetTournamentPicks($id: ID!) {
    tournament(id: $id) {
        id
        name
        groups {
            id
            players {
                id
                firstName
                lastName
            }
        }
    }
  }
`;

export default function Tournament(route) {
    console.log(route.match.params.tournamentId)
    const { data, loading, error } = useQuery(
        GET_TOURNAMENT,
        { variables: { id: route.match.params.tournamentId } }
    );
    if (loading) return '';
    if (error) return `Error! ${error.message}`;
    return (
        <IonPage>
            <AppHeader />
            <IonContent className="ion-padding">
                <div>Tournament {data.tournament.name}</div>
                {data.tournament.groups.map(g => 
                    <PlayerList key={g.id} groupId={g.id} players={g.players}></PlayerList>
                )}
            </IonContent>
        </IonPage>
    )
}