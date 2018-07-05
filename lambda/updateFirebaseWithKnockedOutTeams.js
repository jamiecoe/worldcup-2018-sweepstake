const { closeFirebaseConnection } = require('./firebaseHelperFunctions');

const updateCountryLevel = (countryLevelDataArray, knockedOutTeams) => {
  return countryLevelDataArray.map(countryData => {
    const { name } = countryData;

    if (knockedOutTeams.includes(name)) {
      countryData.knockedOut = true;
    }

    return countryData;
  });
};

const writeUpdateToFirebase = (countries, dbRef) => {
  console.log('Updating firebase...');
  dbRef
    .update({
      '/countries': countries
    })
    .then(() => {
      closeFirebaseConnection();
      console.log('teams updated 👍');
    })
    .catch(err => {
      closeFirebaseConnection();
      console.log('Error with Firebase update =', err);
    });
};

const updateCountriesWithKnockOutStatus = countryLevels =>
  Object.keys(countryLevels).reduce(
    (acc, countryLevel) =>
      Object.assign(acc, {
        [countryLevel]: updateCountryLevel(
          countryLevels[countryLevel],
          knockedOutTeams
        )
      }),
    {}
  );

const updateFirebaseWithKnockedOutTeams = (
  knockedOutTeams,
  snapshot,
  dbRef
) => {
  console.log('knockedOutTeams', knockedOutTeams);

  if (knockedOutTeams.length < 1) {
    closeFirebaseConnection();
    return 'no teams to update';
  }

  const { countries: countryLevels } = snapshot.val();

  writeUpdateToFirebase(
    updateCountriesWithKnockOutStatus(countryLevels),
    dbRef
  );

  return 'finished updating';
};

module.exports = updateFirebaseWithKnockedOutTeams;
