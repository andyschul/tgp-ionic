import React, { useState } from 'react';
import { IonList, IonRadioGroup, IonListHeader, IonItem, IonLabel, IonRadio } from '@ionic/react';
import { useApolloClient } from "@apollo/react-hooks";

const PlayerList = (props) => {
    const client = useApolloClient();

    const handleChange = (e,d) => {
        console.log('test', e, d)
    }
    return (
        <IonList>
        <IonRadioGroup onIonChange={handleChange} value={props.players[7].id}>
        <IonListHeader>Group {props.groupId} {props.idx}</IonListHeader>
          {props.players.map(p => 
            <IonItem key={p.id}>
                <IonLabel>{`${p.firstName} ${p.lastName} (${p.country})`}</IonLabel>
                <IonRadio value={p.id} />
            </IonItem>
            )}
        </IonRadioGroup>
      </IonList>
    )
}

export default PlayerList;