import React from 'react';
import styled, { css } from 'styled-components';

const StyledDiv = styled.div`
  margin: 10px;
  text-align: center;
  position: relative;

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
        background: rgba(255, 0, 0, 0.4);
      }
    `};
`;

const StyledImg = styled.img`
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
`;

const Country = props => {
  return (
    <StyledDiv knockedOut={props.knockedOut}>
      <StyledImg src={props.imgUrl} alt={`${props.name} flag`} />
      <h3>{props.name}</h3>
    </StyledDiv>
  );
};

export default Country;
