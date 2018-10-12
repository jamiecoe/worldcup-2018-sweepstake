import { Component } from 'react'
import lodash from 'lodash'
import { mapDataToState as _mapDataToState } from "../utils/mapDataToState"
import { renderBasedOnState as _renderBasedOnState } from "../utils/renderBasedOnState"
import React from "react"


// error type
function ErrorState(data){
    this.error = data;
}
ErrorState.prototype = {
    getState: function(){
        return this.error;
    }
}
function isError(obj){
    return obj instanceof ErrorState
}

function SuccessState(state){
    this.data = state;
}
SuccessState.prototype = {
    getState: function(){
        return this.data;
    }
}

function isSuccess(obj){
    return obj instanceof SuccessState
}


function ensureHasAllProps(state, requiredProps) {
    const props = lodash.pick(state, requiredProps)
    return Object.keys(props).length === requiredProps.length
        ? new SuccessState(props)
        : new ErrorState('Missing state props');
}


// get data
export const getData = (
    WrappedComponent,
    requiredStateKeys,
    mapDataToState = _mapDataToState,
    renderBasedOnState = ensureComponentRenderedOnSuccessOrError
) => {
    return class extends Component {
        constructor() {
            super()
        }

        componentDidMount() {
            mapDataToState()
                .then(state => {
                    this.setState(
                        ensureHasAllProps(state, requiredStateKeys)
                    )
                })
                .catch(exception => {
                    this.setState(
                        new ErrorState(exception.message)
                    )
                })
        }

        render() {
            return renderBasedOnState(
                this.state,
                WrappedComponent
            )
        }
    }
}


// ensureComponentRenderedOnSuccessOrError
export const ensureComponentRenderedOnSuccessOrError = (state, WrappedComponent) => {
    if (isError(state)) {
        return <span>Oops there has been an error! {state.getState()}</span>
    } else if(isSuccess(state)) {
        return <WrappedComponent {...state.getState()} />
    }
    return <span>Loading...</span>
}


