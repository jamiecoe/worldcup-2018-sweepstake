import React, { Component } from 'react';
import Header from './Header';
import Countdown from './Countdown';
import Rules from './Rules';
import CountryOptions from './CountryOptions/CountryOptions';
import firebase from '../utils/firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      topCountries: {},
      midCountries: {},
      lowCountries: {},
      players: ['Jamie', 'Ed', 'Idan', 'Midge'],
    };
  }

  componentDidMount() {
    this.getCountries();
  }

  getCountries = () => {
    const countriesRef = firebase.database().ref('countries');
    countriesRef.on('value', snapshot => {
      const { top, mid, low } = snapshot.val();

      this.setState({
        topCountries: top,
        midCountries: mid,
        lowCountries: low,
      });
    });
  };

  shuffleAndAssignCountryRank = (countries, players, ranking) => {
    const countryKeys = Object.keys(countries);
    const shuffledKeys = countryKeys.sort(() => Math.random - 0.5);

    const numCountriesPerPlayer = countries.length / players.length;
    let playerCounter = 0;

    shuffledKeys.forEach((countryKey, index) => {
      const owner = players[playerCounter];
      firebase
        .database()
        .ref(`/countries/${ranking}/${countryKey}`)
        .update({ owner });

      if ((index + 1) % numCountriesPerPlayer === 0) {
        playerCounter++;
      }
    });
  };

  assignAllCountries = () => {
    const { players, topCountries, midCountries, lowCountries } = this.state;
    // this.shuffleAndAssignCountryRank()
  }

  render() {
    return (
      <div>
        <Header />
        <Countdown />
        <Rules />
        <CountryOptions
          topCountries={this.state.topCountries}
          midCountries={this.state.midCountries}
          lowCountries={this.state.lowCountries}
        />
      </div>
    );
  }
}

export default App;
