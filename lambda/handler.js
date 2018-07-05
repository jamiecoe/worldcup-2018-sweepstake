'use strict';
const { getKnockedOutTeamsPromise } = require('./getKnockedOutTeams');
const updateFirebaseWithKnockedOutTeams = require('./updateFirebaseWithKnockedOutTeams');
const { getFirebaseDataPromise, getFirebaseRef } = require('./firebaseHelperFunctions');

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
      console.log('confirmationMsg =', confirmationMsg);
      callback(null, 'Lambda complete!');
    })
    .catch(err => console.log('err message =', err));
};
