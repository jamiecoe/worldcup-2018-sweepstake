import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin: 10px;
  text-align: center;
`;

const StyledImg = styled.img`
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
`;

const Country = props => {
  return (
    <StyledDiv>
      <StyledImg src={props.imgUrl} alt={`${props.name} flag`} />
      <h3>{props.name}</h3>
    </StyledDiv>
  );
};

export default Country;
