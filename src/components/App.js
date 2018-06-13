import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';

import Header from './Header';
import Countdown from './Countdown';
import Rules from './Rules';
import CountryOptions from './CountryOptions/CountryOptions';
import PlayerList from './Players/PlayerList';
import firebase from '../utils/firebase.js';

import dusha from '../assets/fonts/dusha.ttf';

injectGlobal`
  @font-face {
    font-family: 'dusha';
    src: url(${dusha});
  }

  h1, h2, h3 {
    font-family: dusha;
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      countries: {},
      players: ['Jamie', 'Ed', 'Idan', 'Midge'],
    };
  }

  componentDidMount() {
    this.getCountries();
  }

  getCountries = () => {
    const countriesRef = firebase.database().ref('countries');
    countriesRef.on('value', snapshot => {
      this.setState({
        countries: snapshot.val(),
      });
    });
  };

  render() {
    const { countries, players } = this.state;

    return (
      <CenteredDiv>
        <Header />
        <Countdown />
        <Rules />
        <CountryOptions countries={countries} />
        <PlayerList players={players} countries={countries} />
      </CenteredDiv>
    );
  }
}

export default App;
