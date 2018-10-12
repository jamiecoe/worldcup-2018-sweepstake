import { Component } from 'react'
import { mapDataToState as _mapDataToState } from "../utils/mapDataToState"
import { renderComponentBasedOnSuccessOrError as _renderComponentBasedOnSuccessOrError } from "../utils/renderComponentBasedOnSuccessOrError"
import { getFirebaseData } from "../utils/getFirebaseData"

export const getData = (
    WrappedComponent,
    requiredStateKeys,
    renderComponentBasedOnSuccessOrError = _renderComponentBasedOnSuccessOrError
) => {
    return class extends Component {
        constructor() {
            super()
            this.state = {}
        }

        componentDidMount() {
            getFirebaseData()
                .then(data => {
                    this.setState(data)
                })
                .catch(err => {
                    this.setState({
                        error: err.message
                    })
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

