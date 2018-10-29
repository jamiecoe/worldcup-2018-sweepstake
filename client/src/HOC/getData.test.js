import React from 'react'
import { shallow } from 'enzyme'

import {
    getData,
    renderComponentBasedOnSuccessOrError,
    ensureStateHasRequiredKeys
} from './getData'
import { SuccessState } from '../utils/SuccessState'
import { ErrorState } from '../utils/ErrorState'

describe('getData HOC', () => {
    // it("should render the loading message, when state is empty", () => {
    //     const MockComponent = () => <div>Test Component</div>
    //     const mockMapDataToState = () => {}
    //
    //     const requiredStateKeys = ['countries', 'players']
    //     const MockComponentWithData = getData(MockComponent, requiredStateKeys, mockMapDataToState)
    //     const mockComponentWithData = shallow(<MockComponentWithData/>)
    //
    //     expect(mockComponentWithData.contains(<span>Loading...</span>)).toBe(true)
    // })
    //
    // it("should render the wrapped component when state is NOT empty", () => {
    //     const MockComponent = () => <div>Test Component</div>
    //     const mockMapDataToState = () => {}
    //
    //     const requiredStateKeys = ['countries', 'players']
    //     const MockComponentWithData = getData(MockComponent, requiredStateKeys, mockMapDataToState)
    //     const mockComponentWithData = shallow(<MockComponentWithData/>)
    //
    //     mockComponentWithData.instance().setState(state => ({
    //         ...state,
    //         countries: {},
    //         players: {}
    //     }))
    //
    //     mockComponentWithData.update()
    //
    //     expect(
    //         mockComponentWithData.contains(
    //             <MockComponent countries={{}} players={{}}/>
    //         )
    //     ).toBe(true)
    // })
    //
    // it('should render an error message if state contains an error message', () => {
    //     const MockComponent = () => <div>Test Component</div>
    //     const mockMapDataToState = () => {}
    //
    //     const requiredStateKeys = ['countries', 'players']
    //     const MockComponentWithData = getData(MockComponent, requiredStateKeys, mockMapDataToState)
    //     const mockComponentWithData = shallow(<MockComponentWithData/>)
    //
    //     const mockErrorMessage = 'Test error'
    //
    //     mockComponentWithData.instance().setState({
    //         error: mockErrorMessage
    //     })
    //
    //     mockComponentWithData.update()
    //
    //     expect(
    //         mockComponentWithData.contains(
    //             <span>Oops there has been an error! {mockErrorMessage}</span>
    //         )
    //     ).toBe(true)
    // })

    describe('ensureStateHasRequiredKeys', () => {
        it('should return a SuccessState object with the required data, if the required keys are present', () => {
            const mockData = {
                countries: {},
                players: {}
            }

            const requiredStateKeys = [ 'countries', 'players' ]

            const newState = ensureStateHasRequiredKeys(mockData, requiredStateKeys)

            expect(newState).toBeInstanceOf(SuccessState)
            expect(newState.getState()).toEqual(mockData)
        })

        it('should return a ErrorState object if any required keys are missing', () => {
            const mockData = {
                countries: {}
            }

            const requiredStateKeys = [ 'countries', 'players' ]

            const newState = ensureStateHasRequiredKeys(mockData, requiredStateKeys)

            expect(newState).toBeInstanceOf(ErrorState)
            expect(newState.getState()).toEqual('Missing required state keys')
        })
    })

    describe('renderComponentBasedOnSuccessOrError', () => {
        it('should return an error message if there is an error in state', () => {
            const mockDataOptional = new ErrorState('test error')

            const errorMessage = <span>Oops there has been an error! {mockDataOptional.getState()}</span>
            const WrappedComponent = () => <span>My wrapped component</span>

            expect(renderComponentBasedOnSuccessOrError(mockDataOptional, WrappedComponent)).toEqual(errorMessage)
        })

        it('should return a loading message if state has not been updated yet', () => {
            const mockDataOptional = undefined

            const loadingMessage = <span>Loading...</span>
            const WrappedComponent = () => <span>My wrapped component</span>

            expect(renderComponentBasedOnSuccessOrError(mockDataOptional, WrappedComponent)).toEqual(loadingMessage)
        })

        it('should a component with required state values if state they are available on state', () => {
            const mockDataOptional = new SuccessState({
                countries: {},
                players: {}
            })

            const WrappedComponent = () => <span>My wrapped component</span>

            expect(renderComponentBasedOnSuccessOrError(mockDataOptional, WrappedComponent))
                .toEqual(<WrappedComponent {...mockDataOptional.getState()}/>)
        })
    })
})
