import React from 'react';
import styled from 'styled-components';
import CountryLevel from './CountryLevel';

const StyledDiv = styled.div`
  width: 100%;
`

const CountryOptions = (props) => {

    const { top, mid, low } = props.countries;

    return (
      <StyledDiv>
        <CountryLevel countries={top} level="Top" />
        <CountryLevel countries={mid} level="Mid" />
        <CountryLevel countries={low} level="Low" />
      </StyledDiv>
    );
}

export default CountryOptions;
