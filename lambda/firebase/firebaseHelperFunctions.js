const firebaseConfig = require('./firebaseConfig')
const _admin = require('firebase-admin').initializeApp(firebaseConfig)

const closeFirebaseConnection = (admin = _admin) => {
  console.log('closing firebase connection')
  admin.delete()
}

const getFirebaseRef = (admin = _admin) => admin.database().ref()

const getFirebaseDataPromise = (_getFirebaseRef = getFirebaseRef) =>
  _getFirebaseRef()
    .once('value')
    .then(snapshot => snapshot)
    .catch(err => Promise.reject(err))

module.exports = {
  closeFirebaseConnection,
  getFirebaseDataPromise,
  getFirebaseRef
}
