import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/react';



const AppHeader = () => {
    return (
        <IonHeader>
            <IonToolbar>
            <IonTitle>
                <IonButton routerLink="/">Home</IonButton>
            </IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default AppHeader;

