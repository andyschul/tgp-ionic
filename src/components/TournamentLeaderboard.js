import React, {useState, useEffect} from 'react';
import { IonContent, IonPage } from '@ionic/react';
import AppHeader from './AppHeader'
import { API, graphqlOperation } from 'aws-amplify'
import {getTournament as GET_TOURNAMENT} from '../graphql/queries'

export default function TournamentLeaderboard(route) {
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
            <IonContent scrollX="true" className="ion-padding">
                <div>Tournament Leaderboard</div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Money</th>
                            <th>Score</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tournament && tournament.leaderboard && tournament.leaderboard.map((g, idx) => 
                        <tr key={g.id} >
                            <td style={{minWidth: 200}}>{g.firstName}</td>
                            <td style={{minWidth: 200}}>{g.position}</td>
                            <td style={{minWidth: 200}}>{g.money}</td>
                            <td style={{minWidth: 200}}>{g.score}</td>
                            <td style={{minWidth: 200}}>{g.status}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </IonContent>
        </IonPage>
    )
}