import firebase from './firebase'

export const getFirebaseData = () => {
  const dbRef = firebase.database().ref()

  return new Promise((resolve, reject) => {
    dbRef.on('value', resolve, reject)
  }).then(snapshot => snapshot.val())
}
