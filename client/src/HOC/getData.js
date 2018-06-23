import React, { Component } from 'react';
import firebase from '../utils/firebase';

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
      const dbRef = firebase.database().ref();
      dbRef.on('value', snapshot => {
        const { countries, players } = snapshot.val();
        this.setState({
          countries,
          players
        });
      });
    };

    render() {
      const { countries, players } = this.state;
      return <WrappedComponent countries={countries} players={players} />;
    }
  };
};

export default getData;
