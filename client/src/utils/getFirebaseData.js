import firebase from './firebase'

const dbRef = firebase.database().ref()

export const getFirebaseData = callback => {
  dbRef.once('value', callback)
}
  
