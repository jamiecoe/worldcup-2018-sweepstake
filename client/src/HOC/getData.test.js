import React from 'react'
import { shallow } from 'enzyme'
import getData from './getData'

describe('getData HOC', () => {
  it('should initially show the loading <span>, when state is empty', () => {
    const MockComponent = () => <div>Test Component</div>
    const mockGetFirebaseData = () => {}

    const MockComponentWithData = getData(MockComponent, mockGetFirebaseData)
    const mockComponentWithData = shallow(<MockComponentWithData />)

    expect(mockComponentWithData.contains(<span>Loading...</span>)).toBe(true)
  })

  it('should update state with the getFirebaseData function', () => {
    const MockComponent = () => <div>Test Component</div>
    const mockState = {
      countries: {},
      players: {}
    }

    const mockGetFirebaseData = jest.fn(callback => {
      const snapshot = {
        val: jest.fn(() => mockState)
      }
      callback(snapshot)
    })

    const MockComponentWithData = getData(MockComponent, mockGetFirebaseData)
    const mockComponentWithData = shallow(<MockComponentWithData />)

    expect(mockGetFirebaseData).toHaveBeenCalledTimes(1)
    expect(mockComponentWithData.state()).toEqual(mockState)
  })

  it('should render the test component when state is not empty', () => {})
})
