import React from "react"
import { renderComponentBasedOnSuccessOrError } from "./renderComponentBasedOnSuccessOrError"

describe('renderComponentBasedOnSuccessOrError', () => {
    it('should return an error message if there is an error in state', () => {
        const mockState = {
            error: 'Test error'
        }

        const requiredStateValues = ['countries', 'players']

        const errorMessage = <span>Oops there has been an error! {mockState.error}</span>
        const WrappedComponent = () => <span>My wrapped component</span>

        expect(renderComponentBasedOnSuccessOrError(mockState, requiredStateValues, WrappedComponent)).toEqual(errorMessage)
    })

    it('should return a loading message if state does not contain the required values', () => {
        const mockState = {
            error: null
        }

        const requiredStateValues = ['countries', 'players']

        const loadingMessage = <span>Loading...</span>
        const WrappedComponent = () => <span>My wrapped component</span>

        expect(renderComponentBasedOnSuccessOrError(mockState, requiredStateValues, WrappedComponent)).toEqual(loadingMessage)
    })

    it('should a component with required state values if state they are available on state', () => {
        const mockState = {
            countries: {},
            players: {},
            error: null
        }

        const requiredStateKeys = ['countries', 'players']

        const WrappedComponent = () => <span>My wrapped component</span>

        expect(renderComponentBasedOnSuccessOrError(mockState, requiredStateKeys, WrappedComponent))
            .toEqual(<WrappedComponent countries={mockState.countries} players={mockState.players}/>)
    })
})
