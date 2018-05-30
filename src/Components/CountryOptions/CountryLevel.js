import React, { Component } from 'react';
import Country from './Country';

class CountryLevel extends Component {
  displayCountries = () =>
    this.props.countries.map(country => (
      <Country {...country} key={country.name} />
    ));

  render() {
    return (
      <div>
        <h2>{this.props.level}</h2>
        {this.displayCountries()}
      </div>
    );
  }
}

export default CountryLevel;
