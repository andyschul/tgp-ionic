import React from 'react';
import { IonContent, IonPage, IonButton, IonCol } from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AppHeader from './AppHeader'
import PlayerList from './PlayerList'

const GET_TOURNAMENT = gql`
  query GetTournamentPicks($id: ID!) {
    tournament(id: $id) {
        id
        name
        leaderboard {
            id
            firstName
            lastName
            position
            money
            score
            status
        }
    }
  }
`;

export default function TournamentLeaderboard(route) {
    const { data, loading, error } = useQuery(
        GET_TOURNAMENT,
        { variables: { id: route.match.params.tournamentId } }
    );
    if (loading) return '';
    if (error) return `Error! ${error.message}`;
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
                    {data.tournament.leaderboard.map((g, idx) => 
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