import React from 'react';
import styled, { css } from 'styled-components';

const StyledDiv = styled.div`
  margin: 10px;
  text-align: center;
  position: relative;  
  min-width: 240px;
  min-height: 125px;

  ${props =>
    props.knockedOut &&
    css`
      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
      }
    `};
`;

const OverlayDiv = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.4s ease;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.9;
  }
`;

const StyledImg = styled.img`
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
  height: 100%;  
  width: 100%;
`;

const Country = props => {
  return (
    <StyledDiv knockedOut={props.knockedOut}>
      <StyledImg src={props.imgUrl} alt={`${props.name} flag`} />
      <OverlayDiv>
        <h3>{props.name}</h3>
      </OverlayDiv>
    </StyledDiv>
  );
};

export default Country;
