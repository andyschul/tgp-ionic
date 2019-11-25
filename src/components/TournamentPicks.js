import React, {useState} from 'react';
import { IonContent, IonToast, IonPage, IonList, IonRadioGroup, IonListHeader, IonLabel, IonRadio, IonItem } from '@ionic/react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AppHeader from './AppHeader'

const GET_TOURNAMENT = gql`
  query GetTournamentPicks($id: ID!, $groupId: ID) {
    tournament(id: $id, groupId: $groupId) {
        id
        name
        groups {
            id
            players {
                id
                firstName
                lastName
                country
                isSelected
            }
        }
    }
  }
`;

const UPDATE_PICKS = gql`
  mutation updatePicks($groupId: ID!, $tournamentId: ID!, $picks: [String]) {
    updatePicks(groupId: $groupId, tournamentId: $tournamentId, picks: $picks) {
      success
    }
  }
`;

export default function TournamentPicks(route) {
    const { data, loading, error, updateQuery } = useQuery(
        GET_TOURNAMENT,
        { variables: { id: route.match.params.tournamentId, groupId: route.match.params.groupId } }
    );
    const [updatePicks] = useMutation(UPDATE_PICKS);
    const [showToast, setShowToast] = useState(false);
    if (loading) return '';
    if (error) return `Error! ${error.message}`;

    function handleSubmit() {
        let picks = []
        for (let g of data.tournament.groups) {
            for (let p of g.players) {
                if (p.isSelected) {
                    picks.push(p.id);
                    break;
                }
            }
        }
        updatePicks({ variables: { groupId: route.match.params.groupId, tournamentId: route.match.params.tournamentId, picks: picks } });
    }

    function handleSelect(idx, playerId) {
        updateQuery(x=>{
            x.tournament.groups[idx].players = x.tournament.groups[idx].players.map(p=>({...p, isSelected: p.id === playerId}))
        })
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
                <div>Tournament {data.tournament.name}</div>
                {data.tournament.groups.map((g, idx) => 
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