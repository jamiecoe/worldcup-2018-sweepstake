import React from 'react';

const Country = (props) => {
  console.log(props);
  
  return (
    <div>
      <img src={props.imgUrl} alt={`${props.name} flag`}/>
      <h3>{props.name}</h3>
    </div>
  )
}

export default Country;
