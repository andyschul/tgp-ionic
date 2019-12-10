import React, {useState, useEffect} from 'react';
import { IonContent, IonToast, IonPage, IonList, IonRadioGroup, IonListHeader, IonLabel, IonRadio, IonItem } from '@ionic/react';
import { API, graphqlOperation } from 'aws-amplify'
import {getTournamentGroups as GET_TOURNAMENT_GROUPS} from '../graphql/queries'
import AppHeader from './AppHeader'

// const UPDATE_PICKS = gql`
//   mutation updatePicks($groupId: ID!, $tournamentId: ID!, $picks: [String]) {
//     updatePicks(groupId: $groupId, tournamentId: $tournamentId, picks: $picks) {
//       success
//     }
//   }
// `;

export default function TournamentPicks(route) {
    const [tournamentGroups, updateTournamentGroups] = useState([])

    useEffect(() => {
        async function fetchData() {
          try {
            const res = await API.graphql(graphqlOperation(GET_TOURNAMENT_GROUPS, { tournamentId: route.match.params.tournamentId, groupId: route.match.params.groupId }))
            updateTournamentGroups(res.data.getTournamentGroups)
          } catch (err) {
            console.log('error: ', err)
          }
        }
        fetchData();
      }, [route.match.params.tournamentId]);

    const [showToast, setShowToast] = useState(false);

    function handleSubmit() {
        let picks = []
        for (let g of tournamentGroups) {
            for (let p of g.players) {
                if (p.isSelected) {
                    picks.push(p.id);
                    break;
                }
            }
        }
        // TODO: mutation to update picks
        console.log(picks)
    }

    function handleSelect(idx, playerId) {
        tournamentGroups[idx].players = tournamentGroups[idx].players.map(p=>({...p, isSelected: p.id === playerId}));
        updateTournamentGroups(tournamentGroups)
        setShowToast(true)
      }

    return (
        <IonPage>
            <AppHeader />
            <IonContent className="ion-padding">
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                position="bottom"
                buttons={[
                {
                    side: 'start',
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Save',
                    handler: () => {
                        handleSubmit();
                    }
                }
                ]}
            />
                <div>Make selections</div>
                {tournamentGroups.map((g, idx) => 
                    <IonList key={g.id}>
                        <IonRadioGroup>
                        <IonListHeader>Group {g.id}</IonListHeader>
                            {g.players.map(p => 
                            <IonItem key={p.id}>
                                <IonLabel>{`${p.firstName} ${p.lastName} (${p.country})`}</IonLabel>
                                <IonRadio value={p.id} checked={p.isSelected} onIonSelect={()=>handleSelect(idx, p.id)} />
                            </IonItem>
                            )}
                        </IonRadioGroup>
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    )
}