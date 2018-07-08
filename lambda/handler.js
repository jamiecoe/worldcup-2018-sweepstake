'use strict'

const { getKnockedOutTeamsPromise } = require('./updateCountries/getKnockedOutTeams')
const updateFirebaseWithKnockedOutTeams = require('./updateCountries/updateFirebaseWithKnockedOutTeams')
const { getFirebaseDataPromise, getFirebaseRef } = require('./firebase/firebaseHelperFunctions')

module.exports.updateCountries = (event, context, callback) => {
  Promise.all([getKnockedOutTeamsPromise(), getFirebaseDataPromise()])
    .then(([knockedOutTeams, databaseSnapshot]) =>
      updateFirebaseWithKnockedOutTeams(
        knockedOutTeams,
        databaseSnapshot,
        getFirebaseRef()
      )
    )
    .then(confirmationMsg => {
      console.log('confirmationMsg =', confirmationMsg)
      callback(null, 'Lambda complete!')
    })
    .catch(err => {
      callback(err)
    })
}
