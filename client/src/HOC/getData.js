import React, {Component} from 'react';

const getData = WrappedComponent => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        countries: {},
        players: []
      };
    }
  
    componentDidMount() {
      this.getCountries();
    }
  
    getCountries = () => {
      fetch(
        'https://ebjrjto9ae.execute-api.us-east-1.amazonaws.com/production/get-countries'
      )
        .then(body => body.json())
        .then(data => {
          const { countries, players } = data;
          this.setState({
            countries,
            players
          });
        });
    };  

    render() {
      const { countries, players } = this.state;

      return (
        <WrappedComponent countries={countries} players={players} />
      )
    }
  }
}

export default getData;