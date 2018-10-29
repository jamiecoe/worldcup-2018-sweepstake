import React from 'react'
import { render, waitForElement } from 'react-testing-library'

import {
    getData,
    returnComponentBasedOnSuccessOrError,
    ensureStateHasRequiredKeys
} from './getData'
import { SuccessState } from '../utils/SuccessState'
import { ErrorState } from '../utils/ErrorState'

describe('getData HOC', () => {
    describe('getData', () => {
        it('should render the loading message, while waiting for the data to be retrieved', () => {
            const MockComponent = () => <div>Test Component</div>
            const requiredStateKeys = []
            const mockGetFirebaseData = () => Promise.resolve()

            const MockComponentWithData = getData(MockComponent, requiredStateKeys, mockGetFirebaseData)
            const { getByText } = render(<MockComponentWithData/>)

            expect(getByText('Loading...')).toBeInTheDocument()
        })

        it('should render the wrapped component with the data, if data has been successfully retrieved', done => {
            const MockComponent = props => (
                <div data-testid="wrapped-component">
                    <p>{props.countries}</p>
                    <p>{props.players}</p>
                </div>
            )

            const mockData = { countries: 'test countries', players: 'test players' }
            const mockGetFirebaseData = () => Promise.resolve(mockData)

            const requiredStateKeys = [ 'countries', 'players' ]
            const MockComponentWithData = getData(MockComponent, requiredStateKeys, mockGetFirebaseData)
            const { getByTestId } = render(<MockComponentWithData/>)

            waitForElement(() => getByTestId('wrapped-component'))
                .then((renderedComponent) => {
                    expect(renderedComponent).toHaveTextContent(mockData.countries)
                    expect(renderedComponent).toHaveTextContent(mockData.players)
                    done()
                })
        })

        it('should render an error message if there was an error fetching the data', done => {
            const MockComponent = () => <div>Test Component</div>
            const mockError = { message: 'test error' }
            const mockGetFirebaseData = () => Promise.reject(mockError)

            const requiredStateKeys = [ 'countries', 'players' ]
            const MockComponentWithData = getData(MockComponent, requiredStateKeys, mockGetFirebaseData)
            const { getByText } = render(<MockComponentWithData/>)

            waitForElement(() => getByText(`Oops there has been an error! ${mockError.message}`))
                .then(() => done())

        })

        it('should render an error message if the data is missing required values', done => {
            const MockComponent = () => <div>Test Component</div>
            const mockGetFirebaseData = () => Promise.resolve({ countries: 'test countries' })

            const requiredStateKeys = [ 'countries', 'players' ]
            const MockComponentWithData = getData(MockComponent, requiredStateKeys, mockGetFirebaseData)
            const { getByText } = render(<MockComponentWithData/>)

            waitForElement(() => getByText('Oops there has been an error! Missing required state keys'))
                .then(() => done())
        })
    })

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

    describe('returnComponentBasedOnSuccessOrError', () => {
        it('should return an error message if there is an error in state', () => {
            const mockDataOptional = new ErrorState('test error')

            const errorMessage = <span>Oops there has been an error! {mockDataOptional.getState()}</span>
            const WrappedComponent = () => <span>My wrapped component</span>

            expect(returnComponentBasedOnSuccessOrError(mockDataOptional, WrappedComponent)).toEqual(errorMessage)
        })

        it('should return a loading message if state has not been updated yet', () => {
            const mockDataOptional = undefined

            const loadingMessage = <span>Loading...</span>
            const WrappedComponent = () => <span>My wrapped component</span>

            expect(returnComponentBasedOnSuccessOrError(mockDataOptional, WrappedComponent)).toEqual(loadingMessage)
        })

        it('should return a component with required state values if state they are available on state', () => {
            const mockDataOptional = new SuccessState({
                countries: {},
                players: {}
            })

            const WrappedComponent = () => <span>My wrapped component</span>

            expect(returnComponentBasedOnSuccessOrError(mockDataOptional, WrappedComponent))
                .toEqual(<WrappedComponent {...mockDataOptional.getState()}/>)
        })
    })
})
