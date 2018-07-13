const {
  closeFirebaseConnection: _closeFirebaseConnection
} = require('../firebase/firebaseHelperFunctions')

const updateCountryLevel = (countryLevelDataArray, knockedOutTeams) =>
  countryLevelDataArray.map(countryData => {
    const { name } = countryData

    if (knockedOutTeams.includes(name) && !countryData.knockedOut) {
      const newCountryData = Object.assign({}, countryData)
      newCountryData.knockedOut = true
      return newCountryData
    }

    return countryData
  })

const writeUpdateToFirebase = (
  countries,
  dbRef,
  closeFirebaseConnection = _closeFirebaseConnection
) =>
  dbRef
    .update({
      '/countries': countries
    })
    .then(() => {
      closeFirebaseConnection()
      return 'teams updated 👍'
    })
    .catch(err => {
      closeFirebaseConnection()
      return Promise.reject(err)
    })

const updateCountriesWithKnockOutStatus = (countryLevels, knockedOutTeams) =>
  Object.keys(countryLevels).reduce(
    (acc, countryLevel) =>
      Object.assign(acc, {
        [countryLevel]: updateCountryLevel(
          countryLevels[countryLevel],
          knockedOutTeams
        )
      }),
    {}
  )

const updateFirebaseWithKnockedOutTeams = (
  knockedOutTeams,
  snapshot,
  dbRef,
  closeFirebaseConnection = _closeFirebaseConnection
) => {
  console.log('knockedOutTeams', knockedOutTeams)
  if (knockedOutTeams.length < 1) {
    closeFirebaseConnection()
    return 'no teams to update'
  }

  const { countries: countryLevels } = snapshot.val()

  return writeUpdateToFirebase(
    updateCountriesWithKnockOutStatus(countryLevels, knockedOutTeams),
    dbRef,
    closeFirebaseConnection
  )
}

module.exports = {
  updateFirebaseWithKnockedOutTeams,
  updateCountriesWithKnockOutStatus,
  writeUpdateToFirebase,
  updateCountryLevel
}
