const { requestJson: _requestJson } = require('../utils/request')

const findKnockedOutTeams = data => {
  if (data.length < 1) {
    return []
  }

  return data
    .map(game => {
      const { home_team_country: home, away_team_country: away, winner } = game
      if (winner !== null) {
        const loser = winner !== home ? home : away
        return loser
      }
      return null
    })
    .filter(Boolean)
}

const getKnockedOutTeamsPromise = (requestJson = _requestJson) =>
  requestJson('https://worldcup.sfg.io/matches/today')
    .then(data => findKnockedOutTeams(data))
    .catch(err => Promise.reject(err))

module.exports = { getKnockedOutTeamsPromise, findKnockedOutTeams }
