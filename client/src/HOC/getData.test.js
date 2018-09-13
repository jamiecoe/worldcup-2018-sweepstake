import React from 'react'
import { shallow } from 'enzyme'
import getData from './getData'

describe('getData HOC', () => {
  // it('should initially show the loading <span>, when state is empty', () => {
  //   const MockComponent = () => <div>Test Component</div>
  //   const mockGetFirebaseData = () => {
  //     return Promise.resolve({ val: () => ({}) })
  //   }

  //   const MockComponentWithData = getData(MockComponent, mockGetFirebaseData)
  //   const mockComponentWithData = shallow(<MockComponentWithData />)

  //   expect(mockComponentWithData.contains(<span>Loading...</span>)).toBe(true)
  // })

  it('should update state with the data from getFirebaseData()', () => {
    const MockComponent = () => <div>Test Component</div>
    const mockState = {
      countries: {},
      players: {}
    }

    let promiseForTesting

    const mockGetFirebaseData = jest.fn(() => {
      const snapshot = {
        val: () => mockState
      }

      // return promiseForTesting.then(() => {
      //   console.log("1. getting snapshot")
      //   return snapshot
      // })      
      
      promiseForTesting = Promise.resolve().then(() => {
        console.log("1. getting snapshot")
        return snapshot
      })      

      return promiseForTesting
      
    })

    const MockComponentWithData = getData(MockComponent, mockGetFirebaseData)
    const mockComponentWithData = shallow(<MockComponentWithData />)
    // how do you assert against something that happens asyncronously in componentDIdMount
    promiseForTesting.then(() => {
      console.log("4. testing promise")      
      expect(mockGetFirebaseData).toHaveBeenCalledTimes(1)      
      console.log(mockComponentWithData.state())
      // expect(mockComponentWithData.state()).toEqual(mockState)
      // done()
    })
  })

  // it('should render the test component when state is not empty', () => {
  //   const MockComponent = () => <div>Test Component</div>
  //   const mockState = {
  //     countries: {},
  //     players: {}
  //   }

  //   const mockGetFirebaseData = jest.fn((callback) => {
  //     const snapshot = {
  //       val: () => mockState
  //     }
  //     callback(snapshot)
  //   })

  //   const MockComponentWithData = getData(MockComponent, mockGetFirebaseData)
  //   const mockComponentWithData = shallow(<MockComponentWithData />)

  //   expect(
  //     mockComponentWithData.contains(<MockComponent {...mockState} />)
  //   ).toBe(true)
  // })
})
