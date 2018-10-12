import React from "react"
import { renderBasedOnState } from "./renderBasedOnState"

describe('renderBasedOnState', () => {
    it('should return an error message if there is an error in state', () => {
        const mockState = {
            error: 'Test error'
        }

        const requiredStateValues = ['countries', 'players']

        const expectedErrorMessage = <span>Oops there has been an error! {mockState.error}</span>
        const WrappedComponent = () => <span>My wrapped component</span>

        expect(renderBasedOnState(mockState, requiredStateValues, WrappedComponent)).toEqual(expectedErrorMessage)
    })

    it('should return a loading message if state does not contain the required values', () => {
        const mockState = {
            error: null
        }

        const requiredStateValues = ['countries', 'players']

        const expectedLoadingMessage = <span>Loading...</span>
        const WrappedComponent = () => <span>My wrapped component</span>

        expect(renderBasedOnState(mockState, requiredStateValues, WrappedComponent)).toEqual(expectedLoadingMessage)
    })

    it('should return the WrappedComponent with required state values if they are available on state', () => {
        const mockState = {
            countries: {},
            players: {},
            error: null
        }

        const requiredStateKeys = ['countries', 'players']

        const WrappedComponent = () => <span>My wrapped component</span>

        expect(renderBasedOnState(mockState, requiredStateKeys, WrappedComponent))
            .toEqual(<WrappedComponent countries={mockState.countries} players={mockState.players}/>)
    })
})
