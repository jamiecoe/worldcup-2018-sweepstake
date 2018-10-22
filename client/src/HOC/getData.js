import React, { Component } from 'react'
import { pick } from 'lodash'

import { getFirebaseData } from '../utils/getFirebaseData'
import { SuccessState } from '../utils/SuccessState'
import { ErrorState } from '../utils/ErrorState'

export const getData = (
    WrappedComponent,
    requiredStateKeys
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
                        ensureStateHasRequiredKeys(data, requiredStateKeys)
                    )
                })
                .catch(err => {
                    this.setState(new ErrorState(err.message))
                })
        }

        render() {
            return renderComponentBasedOnSuccessOrError(
                this.state,
                requiredStateKeys,
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

export const renderComponentBasedOnSuccessOrError = (state, WrappedComponent) => {
    if (ErrorState.isError(state)) {
        return <span>Oops there has been an error! {state.getState()}</span>
    } else if (SuccessState.isSuccess(state)) {
        return <WrappedComponent {...state.getState()} />
    }

    return <span>Loading...</span>
}

