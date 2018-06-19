import React from 'react';
import styled from 'styled-components';
import Country from '../CountryOptions/Country';

const StyledDiv = styled.div`
  @media (max-width: 900px) {
    display: flex;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }
`;

const Player = props => {
  return (
    <div>
      <h2>{props.name}</h2>
      <StyledDiv>
      {props.countries.map(country => (
        <Country {...country} key={country.name} />
      ))}
      </StyledDiv>
    </div>
  );
};

export default Player;
