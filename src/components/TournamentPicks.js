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
                country
            }
        }
    }
  }
`;

export default function Tournament(route) {
    const { data, loading, error } = useQuery(
        GET_TOURNAMENT,
        { variables: { id: route.match.params.tournamentId } }
    );
    if (loading) return '';
    if (error) return `Error! ${error.message}`;

    function handleSubmit(e, d) {
        e.preventDefault();
        console.log(e.target, d)
      }

    return (
        <IonPage>
            <AppHeader />
            <IonContent className="ion-padding">
                <div>Tournament {data.tournament.name}</div>
                <form onSubmit={handleSubmit}>
                <IonButton type="submit">Save</IonButton>
                {data.tournament.groups.map((g, idx) => 
                    <PlayerList key={g.id} idx={idx} groupId={g.id} players={g.players}></PlayerList>
                )}
                </form>
            </IonContent>
        </IonPage>
    )
}