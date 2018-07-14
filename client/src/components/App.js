import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Countdown from './Countdown';
import Rules from './Rules';
import CountryOptions from './CountryOptions/CountryOptions';
import PlayerList from './Players/PlayerList';

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = props => {
  const { countries, players } = props;
  return (
    <CenteredDiv>
      <Header />
      {/* <Countdown /> */}
      <PlayerList players={players} countries={countries} />
      <CountryOptions countries={countries} />
      {/* <Rules /> */}
    </CenteredDiv>
  );
};

export default App;
