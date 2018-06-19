import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align: center;
`

const Header = () => {
  return (
    <StyledDiv>
      <h1>World Cup 2018 Russia Sweep Stake</h1>
      <img src="https://upload.wikimedia.org/wikipedia/en/6/67/2018_FIFA_World_Cup.svg" alt="World Cup 2018 Russia logo" />
    </StyledDiv>
  )
}

export default Header;