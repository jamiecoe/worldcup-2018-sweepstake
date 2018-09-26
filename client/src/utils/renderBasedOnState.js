import React from "react"

export const renderBasedOnState = (state, requiredStateKeys, WrappedComponent) => {
    if (state.error) {
        return <span>Oops there has been an error! {state.error}</span>
    }

    const containsRequiredValues = requiredStateKeys.every(stateKey => state.hasOwnProperty(stateKey))

    if (containsRequiredValues) {
        const propsToMap = requiredStateKeys.reduce((props, stateKey) => {
            props[stateKey] = state[stateKey]
            return props
        }, {})

        return <WrappedComponent {...propsToMap} />
    }

    return <span>Loading...</span>
}