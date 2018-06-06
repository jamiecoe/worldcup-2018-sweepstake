import React, { Component } from 'react';
import CountryLevel from './CountryLevel';

class CountryOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topCountries: [],
      midCountries: [],
      lowCountries: [],
    };
  }

  render() {
    return (
      <div>
        <CountryLevel countries={this.props.topCountries} level="Top" />
        <CountryLevel countries={this.props.midCountries} level="Mid" />
        <CountryLevel countries={this.props.lowCountries} level="Low" />
      </div>
    );
  }
}

export default CountryOptions;
