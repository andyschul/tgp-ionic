import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import React from 'react';
import { IonPage, IonInput, IonButton, IonContent } from '@ionic/react';
import AppHeader from './AppHeader'

const GET_USER = gql`
  {
    user {
      firstName
      lastName
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateProfile($firstName: String, $lastName: String) {
    updateUser(firstName: $firstName, lastName: $lastName) {
      firstName
      lastName
    }
  }
`;

const Profile = () => {
    const { client, loading, error, data, updateQuery } = useQuery(GET_USER);
    const [updateUser] = useMutation(UPDATE_USER);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    function handleSubmit(e) {
      e.preventDefault();
      updateUser({ variables: { firstName: data.user.firstName, lastName: data.user.lastName } });
    }

    function handleFirstChange(e) {
      updateQuery(x=>{
        return {
          user: {
            ...x.user,
            firstName: e.target.value
          }
        }
      });
    }

    function handleLastChange(e) {
      updateQuery(x=>{
        return {
          user: {
            ...x.user,
            lastName: e.target.value
          }
        }
      });
    }

    return (
        <IonPage>
            <AppHeader />
            <IonContent className="ion-padding">
                <form
                onSubmit={handleSubmit}
                >
                    <IonInput placeholder="First Name" value={data.user.firstName} onInput={handleFirstChange}></IonInput>
                    <IonInput placeholder="Last Name" value={data.user.lastName} onInput={handleLastChange}></IonInput>
                    <IonButton type="submit">Save</IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
}

export default Profile;