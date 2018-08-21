import React, { Component } from 'react'
import { getFirebaseData as _getFirebaseData } from '../utils/getFirebaseData'
import { isEmpty } from '../utils/isEmpty'

const getData = (WrappedComponent, getFirebaseData = _getFirebaseData) => {
  return class extends Component {
    constructor() {
      super()
      this.state = {}
    }

    componentDidMount() {
      this.getData()
    }

    getData() {
      getFirebaseData(snapshot => {        
        const { countries, players } = snapshot.val()
        this.setState({
          countries,
          players
        })
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
