import React, {useState, useEffect} from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import AppHeader from './AppHeader'
import { API, graphqlOperation } from 'aws-amplify'
import {getTournament as GET_TOURNAMENT} from '../graphql/queries'


export default function Tournament(route) {
    const [tournament, updateTournament] = useState({})

    useEffect(() => {
        async function fetchData() {
          try {
            const res = await API.graphql(graphqlOperation(GET_TOURNAMENT, {id: route.match.params.tournamentId}))
            updateTournament(res.data.getTournament)
          } catch (err) {
            console.log('error: ', err)
          }
        }
        fetchData();
      }, [route.match.params.tournamentId]);

    return (
        <IonPage>
            <AppHeader />
            <IonContent className="ion-padding">
                <div>Tournament {tournament && tournament.name} at {tournament && tournament.venue && tournament.venue.name}!</div>
                <div><IonButton routerLink={`/groups/${route.match.params.groupId}/tournaments/${route.match.params.tournamentId}/picks`}>Make Picks</IonButton></div>
                <IonButton routerLink={`/groups/${route.match.params.groupId}/tournaments/${route.match.params.tournamentId}/leaderboard`}>Leaderboard</IonButton>
            </IonContent>
        </IonPage>
    )
}