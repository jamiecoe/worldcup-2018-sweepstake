import React from 'react';
import CountryLevel from './CountryLevel';

const CountryOptions = () => {
  return (
    <div>
      <CountryLevel level="Top" />
      <CountryLevel level="Mid" />
      <CountryLevel level="Low" />
    </div>
  )
}

export default CountryOptions;