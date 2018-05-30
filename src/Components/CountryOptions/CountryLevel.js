import React, { Component } from 'react';

class CountryLevel extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.level}</h2>
      </div>
    )
  }
}

export default CountryLevel;
