import React, { useState } from 'react';
import { IonInput, IonButton } from '@ionic/react';

const PlayerList = (props) => {
    console.log(props)
    return (
        <div>
            <label>Group {props.groupId}</label>
            {props.players.map(p => 
                <div>{`${p.firstName} ${p.lastName}`}</div>    
            )}
        </div>
    )
}

export default PlayerList;