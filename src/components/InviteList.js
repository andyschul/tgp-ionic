import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';

export default function InviteList() {

    return (
        <IonList>
            {[{name: 'test', id: 1}].map((tournament) => (
                <IonItem button key={tournament.id}>
                    <IonLabel>{tournament.name}</IonLabel>
                </IonItem>
            ))}
        </IonList>
    )
}