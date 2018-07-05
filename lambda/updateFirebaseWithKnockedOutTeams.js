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

  const { countries } = snapshot.val();
  const countryLevelsArray = Object.keys(countries);

  countryLevelsArray.forEach(countryLevel => {
    const countryLevelDataArray = countries[countryLevel];
    countries[countryLevel] = updateCountryLevel(
      countryLevelDataArray,
      knockedOutTeams
    );
  });

  writeUpdateToFirebase(countries, dbRef);

  return 'finished updating';
};

module.exports = updateFirebaseWithKnockedOutTeams;
