import React, {Component} from 'react'
import {getFirebaseData as _getFirebaseData} from '../utils/getFirebaseData'
import {isEmpty} from '../utils/isEmpty'

export const mapSnapshotToState = (Component, snapshot) => {
    const values = snapshot.val()
    Component.setState(values)
}

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
            getFirebaseData()
                .then(snapshot => {
                    mapSnapshotToState(this, snapshot)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        render() {
            if (isEmpty(this.state)) {
                return <span>Loading...</span>
            }

            const {countries, players} = this.state

            return <WrappedComponent countries={countries} players={players}/>
        }
    }
}

export default getData
