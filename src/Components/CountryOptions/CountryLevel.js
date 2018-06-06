import React, { Component } from 'react';
import styled from 'styled-components';
import Country from './Country';

const StyledDiv = styled.div`
  display: flex;
  overflow-x: scroll;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
`

class CountryLevel extends Component {
  displayCountries = () =>
    this.props.countries.map(country => (
      <Country {...country} key={country.name} />
    ));

  render() {
    return (
      <div>
        <h2>{this.props.level}</h2>
        <StyledDiv>          
          {this.displayCountries()}
        </StyledDiv>
      </div>
    );
  }
}

export default CountryLevel;
