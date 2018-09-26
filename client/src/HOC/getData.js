import React, { Component } from 'react'
import { mapDataToState as _mapDataToState } from "../utils/mapDataToState"
import { renderBasedOnState as _renderBasedOnState } from "../utils/renderBasedOnState"

export const getData = (
    WrappedComponent,
    mapDataToState = _mapDataToState,
    renderBasedOnState = _renderBasedOnState
) => {
    return class extends Component {
        constructor() {
            super()
            this.state = {
                error: null
            }
        }

        componentDidMount() {
            mapDataToState(this)
        }

        render() {
            return renderBasedOnState(
                this.state,
                ['countries', 'players'],
                WrappedComponent
            )
        }
    }
}
