import React, { Component } from 'react';
import styled from 'styled-components';
import Country from './Country';

const StyledDiv = styled.div`
  display: flex;
  overflow-x: scroll;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
  background: white;
`

class CountryLevel extends Component {
  displayCountries = () => {
    const { countries } = this.props;  
    const componentArray = [];

    for (const country in countries) {
      componentArray.push(<Country {...countries[country]} key={countries[country].name} />);
    }

    return componentArray;
  }
    

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
