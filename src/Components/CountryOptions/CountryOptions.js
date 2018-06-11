import React from 'react';
import CountryLevel from './CountryLevel';

const CountryOptions = (props) => {

    const { top, mid, low } = props.countries;

    return (
      <div>
        <CountryLevel countries={top} level="Top" />
        <CountryLevel countries={mid} level="Mid" />
        <CountryLevel countries={low} level="Low" />
      </div>
    );
}

export default CountryOptions;
