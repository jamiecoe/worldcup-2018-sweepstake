import React, { Component } from 'react';

import Header from './Header';
import Countdown from './Countdown';
import Rules from './Rules';
import CountryOptions from './CountryOptions/CountryOptions';
import PlayerList from './Players/PlayerList';
import firebase from '../utils/firebase.js';

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
        countries: snapshot.val()
      });
    });
  };

  render() {
    const { countries, players } = this.state;

    return (
      <div>
        <Header />
        <Countdown />
        <Rules />
        <CountryOptions
          countries={countries}
        />
        <PlayerList
          players={players}
          countries={countries}
        />
      </div>
    );
  }
}

export default App;
