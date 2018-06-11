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
      lowCountries: {}
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
