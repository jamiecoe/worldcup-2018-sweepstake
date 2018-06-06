import React, { Component } from 'react';
import Header from './Header';
import Countdown from './Countdown';
import Rules from './Rules';
import CountryOptions from './CountryOptions/CountryOptions';
import firebase from '../utils/firebase.js';
import { objectToArray } from '../helpers/helperFunctions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      topCountriesArray: [],
      midCountriesArray: [],
      lowCountriesArray: []
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
        topCountriesArray: objectToArray(top),
        midCountriesArray: objectToArray(mid),
        lowCountriesArray: objectToArray(low)
      });
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Countdown />
        <Rules />
        <CountryOptions 
          topCountries={this.state.topCountriesArray} 
          midCountries={this.state.midCountriesArray}
          lowCountries={this.state.lowCountriesArray}
          />
      </div>
    );
  }
}

export default App;
