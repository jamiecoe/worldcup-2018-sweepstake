import React from 'react'
import { shallow } from 'enzyme'
import getData from './getData'

describe('getData HOC', () => {
  it('should initially show the loading <span>, when state is empty', () => {
    const MockComponent = () => <div>Test Component</div>
    const mockGetFirebaseData = () => Promise.resolve({})
    
    const MockComponentWithData = getData(MockComponent, mockGetFirebaseData)
    const mockComponentWithData = shallow(<MockComponentWithData />)

    expect(mockComponentWithData.contains(<span>Loading...</span>)).toBe(true)
  })

  it('should initially show the loading <span>, when state is empty', () => {
    const MockComponent = () => <div>Test Component</div>
    const mockGetFirebaseData = jest.fn(() =>
      Promise.resolve({
        countries: {},
        players: {}
      })
    )
    const MockComponentWithData = getData(MockComponent, mockGetFirebaseData)
    const mockComponentWithData = shallow(<MockComponentWithData />)

    expect(mockComponentWithData.contains(<span>Loading...</span>)).toBe(true)
  })

  // it('should produce a new component that wraps around MockComponent', () => {
  //   const MockComponent = () => <div>Test Component</div>
  //   const mockVal = jest.fn().mockReturnValue({
  //     countries: {},
  //     players: {}
  //   })
  //   const mockOn = jest.fn(() =>
  //     Promise.resolve({
  //       val: mockVal
  //     })
  //   )

  //   const mockDbRef = {
  //     on: mockOn
  //   }

  //   const MockComponentWithData = getData(MockComponent, mockDbRef)
  //   const mockComponentWithData = shallow(<MockComponentWithData />)

  //   expect(mockVal).toHaveBeenCalled()
  //   console.log(mockComponentWithData.contains(<div>Test Component</div>))
  //   console.log(mockComponentWithData.state())
  // })

  it('produces a component which calls getUser() method when the component mounts', () => {})
})
