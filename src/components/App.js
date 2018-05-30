import React, { Component } from 'react';
import Header from './Header';
import Countdown from './Countdown';
import Rules from './Rules';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Countdown />
        <Rules />
      </div>
    );
  }
}

export default App;
