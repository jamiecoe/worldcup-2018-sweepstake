import React from 'react';
import styled from 'styled-components';
import Player from './Player';

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  text-align: center;
`;

const PlayerList = props => {
  const { countries, players } = props;
  const playerToCountryMap = mapCountriesToPlayers(countries, players);
  const playerToCountryKeys = Object.keys(playerToCountryMap);

  return (
    <StyledDiv>
      {playerToCountryKeys.map(playerKey => (
        <Player
          countries={playerToCountryMap[playerKey]}
          name={playerKey}
          key={playerKey}
        />
      ))}
    </StyledDiv>
  );
};

const mapCountriesToPlayers = (countries, players) => {
  const playerToCountryMap = {};

  players.forEach(player => {
    const arrayOfCountries = [];

    for (const ranking in countries) {
      countries[ranking].forEach(country => {
        if (country.owner === player) {
          arrayOfCountries.push(country);
        }
      });
    }

    playerToCountryMap[player] = arrayOfCountries;
  });

  return playerToCountryMap;
};

export default PlayerList;
