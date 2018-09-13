import firebase from './firebase'

const composeGetFirebaseData = () => {}

export const getFirebaseData = () => {
  const dbRef = firebase.database().ref()

  return new Promise((resolve, reject) => {
    dbRef.on('value', resolve)
  })
}
