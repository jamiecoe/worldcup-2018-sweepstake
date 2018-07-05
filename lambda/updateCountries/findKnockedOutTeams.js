const findKnockedOutTeams = data => {
	return data
		.map(game => {
			const {
				status,
				home_team_country: home,
				away_team_country: away,
				winner
			} = game;

			if (status === 'completed') {
				const loser = winner !== home ? home : away;
				return loser;
			}
		})
		.filter(Boolean);
};

module.exports = findKnockedOutTeams;