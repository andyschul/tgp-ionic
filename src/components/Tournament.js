import React from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AppHeader from './AppHeader'

const GET_TOURNAMENT = gql`
  query GetTournament($id: ID!) {
    tournament(id: $id) {
        id
        name
        startDate
        endDate
        purse
        winningShare
        venue {
            id
            name
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
                <div>Tournament {data.tournament.name} at {data.tournament.venue.name}!</div>
                <div><IonButton routerLink={`/groups/${route.match.params.groupId}/tournaments/${route.match.params.tournamentId}/picks`}>Make Picks</IonButton></div>
                <IonButton routerLink={`/groups/${route.match.params.groupId}/tournaments/${route.match.params.tournamentId}/leaderboard`}>Leaderboard</IonButton>
            </IonContent>
        </IonPage>
    )
}