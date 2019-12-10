import React, {useState, useEffect} from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import {getSchedule as GET_SCHEDULE} from '../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'

const TournamentList = (props) => {
  const [schedule, updateSchedule] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.graphql(graphqlOperation(GET_SCHEDULE, {year: props.year}))
        updateSchedule(res.data.getSchedule)
      } catch (err) {
        console.log('error: ', err)
      }
    }
    fetchData();
  }, [props.year]);

  return (
    <IonList>
      {schedule.map((tournament, index) => (
        <IonItem button key={tournament.id} routerLink={`/groups/${props.groupId}/tournaments/${tournament.id}`}>
          <IonLabel>{tournament.name}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  )
}

export default TournamentList;