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
      countriesArray: [],
    };
  }

  componentDidMount() {
    this.getCountries();
  }

  getCountries = () => {
    const countriesRef = firebase.database().ref('countries');
    countriesRef.on('value', snapshot => {
      const countriesObject = snapshot.val();
      const countriesArray = [];

      for (const country in countriesObject) {
        const singleCountryObject = countriesObject[country];
        countriesArray.push(singleCountryObject);
      }

      this.setState({ countriesArray });
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Countdown />
        <Rules />
        <CountryOptions countries={this.state.countriesArray} />
      </div>
    );
  }
}

export default App;
