import React, { Component } from 'react';
import Header from './Header';
import Countdown from './Countdown';
import Rules from './Rules';
import CountryOptions from './CountryOptions/CountryOptions';
import firebase from '../utils/firebase.js';

class App extends Component {
  render() {

    const itemsRef = firebase.database().ref('countries');
    itemsRef.on('value', (snapshot) => {
      console.log(snapshot.val());
    });
    

    return (
      <div>
        <Header />
        <Countdown />
        <Rules />
        <CountryOptions />
      </div>
    );
  }
}

export default App;
