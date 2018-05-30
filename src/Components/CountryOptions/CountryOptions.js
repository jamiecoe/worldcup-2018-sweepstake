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

  componentDidUpdate = () => {
    const { topCountries, midCountries, lowCountries } = this.state;

    if (
      topCountries.length < 1 ||
      midCountries.length < 1 ||
      lowCountries.length < 1
    ) {
      this.props.countries.forEach(country => {
        switch (country.ranking) {
          case 'top':
            this.setState(prevState => ({
              topCountries: [...prevState.topCountries, country],
            }));
            break;
          case 'mid':
            this.setState(prevState => ({
              midCountries: [...prevState.midCountries, country],
            }));
            break;
          case 'low':
            this.setState(prevState => ({
              lowCountries: [...prevState.lowCountries, country],
            }));
            break;
          default:
            break;
        }
      });
    }
  };

  render() {
    return (
      <div>
        <CountryLevel countries={this.state.topCountries} level="Top" />
        <CountryLevel countries={this.state.midCountries} level="Mid" />
        <CountryLevel countries={this.state.lowCountries} level="Low" />
      </div>
    );
  }
}

export default CountryOptions;
