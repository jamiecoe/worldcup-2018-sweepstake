import React from "react"
import { shallow } from "enzyme"
import { getData } from "./getData"

describe("getData HOC", () => {
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
})
