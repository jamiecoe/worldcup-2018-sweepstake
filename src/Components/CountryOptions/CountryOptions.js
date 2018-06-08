import React from 'react';
import CountryLevel from './CountryLevel';

const CountryOptions = (props) => {
    return (
      <div>
        <CountryLevel countries={props.topCountries} level="Top" />
        <CountryLevel countries={props.midCountries} level="Mid" />
        <CountryLevel countries={props.lowCountries} level="Low" />
      </div>
    );
}

export default CountryOptions;
