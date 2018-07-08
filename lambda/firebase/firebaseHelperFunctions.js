const firebaseConfig = require('./firebaseConfig')
const admin = require('firebase-admin').initializeApp(firebaseConfig)

const closeFirebaseConnection = () => {
  console.log('closing firebase connection')
  admin.delete()
}

const getFirebaseRef = () => admin.database().ref()

const getFirebaseDataPromise = () =>
  getFirebaseRef()
    .once('value')
    .then(snapshot => snapshot)

module.exports = {
  closeFirebaseConnection,
  getFirebaseDataPromise,
  getFirebaseRef
}
