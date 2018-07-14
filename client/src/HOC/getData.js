import React, { Component } from 'react'
import firebase from '../utils/firebase'
import { isEmpty } from 'lodash'

const getData = WrappedComponent => {
  return class extends Component {
    constructor() {
      super()
      this.state = {}
    }

    componentDidMount() {
      this.getData()
    }

    getData = () => {
      const dbRef = firebase.database().ref()
      dbRef.on('value', snapshot => {
        const { countries, players } = snapshot.val()
        this.setState({
          countries,
          players
        });
      })
    }

    render() {
      if (isEmpty(this.state)) {
        return <span>Loading...</span>
      }

      const { countries, players } = this.state

      return <WrappedComponent countries={countries} players={players} />
    }
  }
}

export default getData
