import React from 'react';
import styled, { injectGlobal } from 'styled-components';

import Header from './Header';
import Countdown from './Countdown';
import Rules from './Rules';
import CountryOptions from './CountryOptions/CountryOptions';
import PlayerList from './Players/PlayerList';

import dusha from '../assets/fonts/dusha.ttf';

injectGlobal`
  @font-face {
    font-family: 'dusha';
    src: url(${dusha});
  }

  h1, h2, h3 {
    font-family: dusha;
  }

  h1 {
    font-size: 4rem;
  }

  p, a, li {
    font-family: 'Open Sans', sans-serif;
  }

  a {
    color: gold;
  }

  body {
    background: #0f4583 url("https://www.fifa.com/assets/img/tournaments/17/2018/common/fwc_darkbluebg.png") repeat;
    color: white;
  }
`;

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
