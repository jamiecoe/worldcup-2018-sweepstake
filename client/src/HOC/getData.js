import React, { Component } from 'react'
import { pick } from 'lodash'

import { getFirebaseData as _getFirebaseData } from '../utils/getFirebaseData'
import { SuccessState } from '../utils/SuccessState'
import { ErrorState } from '../utils/ErrorState'

export const getData = (
    WrappedComponent,
    requiredStateKeys,
    getFirebaseData = _getFirebaseData
) => {
    return class extends Component {
        constructor() {
            super()
            this.state = {}
        }

        componentDidMount() {
            getFirebaseData()
                .then(data => {
                    this.setState(
                        { dataOptional: ensureStateHasRequiredKeys(data, requiredStateKeys) }
                    )
                })
                .catch(err => {
                    this.setState({ dataOptional: new ErrorState(err.message) })
                })
        }

        render() {
            return returnComponentBasedOnSuccessOrError(
                this.state.dataOptional,
                WrappedComponent
            )
        }
    }
}

export const ensureStateHasRequiredKeys = (state, requiredKeys) => {
    const requiredState = pick(state, requiredKeys)
    return Object.keys(requiredState).length === requiredKeys.length
        ? new SuccessState(requiredState)
        : new ErrorState('Missing required state keys')
}

export const returnComponentBasedOnSuccessOrError = (dataOptional, WrappedComponent) => {
    if (ErrorState.isError(dataOptional)) {
        return <span>Oops there has been an error! {dataOptional.getState()}</span>
    } else if (SuccessState.isSuccess(dataOptional)) {
        return <WrappedComponent {...dataOptional.getState()} />
    }

    return <span>Loading...</span>
}

