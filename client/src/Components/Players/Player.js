import React from 'react';
import Country from '../CountryOptions/Country';

const Player = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      {props.countries.map(country => 
        <Country {...country} key={country.name}/>
      )}
    </div>
  )
}

export default Player;