const request = require('request-promise');

const findKnockedOutTeams = data => {
  if (data.length < 1) {
    return [];
  }

  return data
    .map(game => {
      const { home_team_country: home, away_team_country: away, winner } = game;

      if (winner !== null) {
        const loser = winner !== home ? home : away;
        return loser;
      }

      return null;
    })
    .filter(Boolean);
};

const getKnockedOutTeamsPromise = () => {
  const worldCupApiUrl = 'https://worldcup.sfg.io/matches/today';

  const options = {
    uri: worldCupApiUrl,
    json: true
  };

  return request(options).then(data => findKnockedOutTeams(data));
};

module.exports = { getKnockedOutTeamsPromise, findKnockedOutTeams };
